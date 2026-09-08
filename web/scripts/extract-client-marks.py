"""Extract the original PDF client marks with their transparency masks intact."""
from pathlib import Path
import subprocess
from pypdf import PdfReader

root = Path(__file__).resolve().parents[2]
pdf = PdfReader(root / 'In2IT EBS Corporate Profile _200526.pdf')
out = root / 'web/public/logos/deck-clients'
out.mkdir(parents=True, exist_ok=True)
for number in (42, 43):
    for asset in pdf.pages[number - 1].images:
        asset.image.save(out / f'p{number}-{Path(asset.name).stem}.png')
for name, x, y, width, height in (
    ('natural-remedies', 3120, 600, 280, 190),
    ('wipro-infra', 1940, 1600, 645, 94),
    ('bio-pharma-services', 2060, 380, 310, 100),
):
    subprocess.run([
        'pdftoppm', '-f', '42', '-l', '42', '-scale-to', '3600',
        '-x', str(x), '-y', str(y), '-W', str(width), '-H', str(height),
        '-singlefile', '-png', str(root / 'In2IT EBS Corporate Profile _200526.pdf'),
        str(out / name),
    ], check=True)
print('Extracted source marks with PDF masks, without modifying originals.')
for name, x, y, width, height in (
    ('mrs-bectors', 3080, 752, 680, 48),
    ('cremica', 3080, 840, 360, 172),
    ('english-oven', 3500, 828, 240, 180),
):
    subprocess.run([
        'pdftoppm', '-f', '42', '-l', '42', '-scale-to', '7200',
        '-x', str(x), '-y', str(y), '-W', str(width), '-H', str(height),
        '-singlefile', '-png', str(root / 'In2IT EBS Corporate Profile _200526.pdf'),
        str(out / name),
    ], check=True)
