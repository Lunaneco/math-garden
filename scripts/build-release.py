"""Build only browser runtime files; never copy saves, logs or source artwork."""
from pathlib import Path
import argparse
import json
import re
import shutil
import hashlib

ROOT = Path(__file__).resolve().parent.parent
MEDIA = {'.png', '.svg', '.wav', '.webp', '.jpg', '.jpeg', '.mp3', '.ogg'}

def release_files():
    html = (ROOT / 'index.html').read_text()
    runtime = {'index.html', 'app.js', 'placement.js', 'daily-growth.mjs'}
    runtime.update(re.findall(r'href="\./([^"\n]+\.css)"', html))
    source = '\n'.join((ROOT / name).read_text() for name in sorted(runtime))
    paths = set(re.findall(r'(?:\./)?assets/[A-Za-z0-9_.\-/]*', source))
    for raw in paths:
        relative = raw.removeprefix('./')
        asset = ROOT / relative
        if asset.is_dir():
            runtime.update(str(p.relative_to(ROOT)) for p in asset.rglob('*') if p.is_file() and p.suffix.lower() in MEDIA)
        elif asset.is_file() and asset.suffix.lower() in MEDIA:
            runtime.add(relative)
        else:
            raise RuntimeError(f'Missing runtime asset: {relative}')
    return sorted(runtime)

def build(destination):
    destination = destination.resolve()
    if destination == ROOT or ROOT not in destination.parents:
        raise ValueError('Output must be a separate directory inside this project.')
    destination.mkdir(parents=True, exist_ok=True)
    # Remove only output files owned by the preceding release build.
    ledger = destination / 'release-manifest.json'
    if ledger.exists():
        for name in json.loads(ledger.read_text())['files']:
            old = destination / name
            if destination not in old.resolve().parents:
                raise ValueError('Unsafe previous release path')
            old.unlink(missing_ok=True)
    files = release_files()
    for name in files:
        target = destination / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / name, target)
    (destination / '.nojekyll').touch()
    manifest = {'files': {name: hashlib.sha256((destination / name).read_bytes()).hexdigest() for name in files}}
    ledger.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    size = sum((destination / name).stat().st_size for name in files)
    print(f'Release: {len(files)} files, {size / 1024 / 1024:.1f} MiB, {destination}')
    return files

def prepare_git():
    files = sorted(set(release_files()) | {
        '.gitignore', 'README.md', '.github/workflows/deploy-pages.yml',
        'scripts/build-release.py', 'tests/deployment-readiness.mjs',
        'tests/garden-growth-audit-runtime.mjs',
    })
    parents = sorted({str(parent) for name in files for parent in Path(name).parents if str(parent) != '.'})
    lines = ['# Only reviewed runtime files and deployment tools are tracked.',
             '# Regenerate with: python3 scripts/build-release.py --prepare-git', '*',
             *[f'!/{parent}/' for parent in parents], *[f'!/{name}' for name in files]]
    (ROOT / '.gitignore').write_text('\n'.join(lines) + '\n')
    private = ROOT / 'work/deployment'
    private.mkdir(parents=True, exist_ok=True)
    (private / 'source-files.nul').write_bytes(b'\0'.join(name.encode() for name in files) + b'\0')
    print(f'Git allowlist: {len(files)} source files; backups and work files stay local.')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--out', default='dist')
    parser.add_argument('--list', action='store_true')
    parser.add_argument('--prepare-git', action='store_true')
    args = parser.parse_args()
    if args.prepare_git:
        prepare_git()
    elif args.list:
        print('\n'.join(release_files()))
    else:
        build(ROOT / args.out)
