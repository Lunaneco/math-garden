import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {runtime, root} from './garden-growth-audit-runtime.mjs';

const qa = runtime(undefined, ['nyanlunaTtsUrl', 'questionSpeechIsAvailable', 'resolveNyanlunaAudioUrl', 'NYANLUNA_PREBAKED_WAVS', 'window', 'globalThis']);
const remote = {protocol: 'https:', hostname: 'lunaneco.github.io', search: '?qa=1'};
qa.window.location = remote;
assert.equal(qa.nyanlunaTtsUrl(), '', 'Public visitors must never call their own localhost TTS server');
let requests = 0;
qa.globalThis.fetch = () => { requests++; throw new Error('Unexpected request'); };
const unknown = {prompt: '公開環境の未収録問題', subPrompt: ''};
assert.equal(qa.questionSpeechIsAvailable(unknown), false);
await assert.rejects(qa.resolveNyanlunaAudioUrl(unknown.prompt));
assert.equal(requests, 0, 'Unavailable public recordings cause no network request');
const recordings = Object.entries(qa.NYANLUNA_PREBAKED_WAVS);
assert.ok(recordings.length > 0);
for (const [text, relative] of recordings) {
  assert.equal(qa.questionSpeechIsAvailable({audioScript: text}), true);
  assert.equal(await qa.resolveNyanlunaAudioUrl(text), relative);
  assert.ok(fs.statSync(path.join(root, relative)).size > 44, 'Recorded voice must contain audio');
}
assert.equal(requests, 0);
for (const location of [{protocol: 'file:', hostname: ''}, {protocol: 'http:', hostname: '127.0.0.1'}, {protocol: 'http:', hostname: 'localhost'}]) {
  qa.window.location = location;
  assert.equal(qa.nyanlunaTtsUrl(), 'http://127.0.0.1:8765/tts', 'Local frozen-voice development remains supported');
}
qa.window.location = remote;
qa.window.MATHGARDEN_NYANLUNA_TTS_URL = 'https://voice.example.test/tts';
assert.equal(qa.nyanlunaTtsUrl(), qa.window.MATHGARDEN_NYANLUNA_TTS_URL);
assert.equal(qa.questionSpeechIsAvailable(unknown), true);
console.log(`Public/local speech boundaries pass; ${recordings.length} recordings verified.`);
