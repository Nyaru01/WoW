from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
LOCAL_IMAGES = [
    "azeroth-cosmique.png",
    "chute-arthas.png",
    "citadelle-glace.png",
    "kaldorei-puits-eternite.png",
    "mont-hyjal.png",
    "porte-tenebres.png",
    "torch-rp.png",
]
REMOTE_IMAGES = {
    "horde-forever.webp": "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltcad7f503e583d5b7/6a91d0db2437ed959cd486b0/WoW_Camelot_AnnounceSupport_Horde_BnetShop_1920x1080_(1).png?imwidth=1920",
    "alliance-forever.webp": "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltd1d2ec1b4afa617f/6a91d0e7dee8843ceecba8ae/WoW_Camelot_AnnounceSupport_Alliance_BnetShop_ProductAssetGallery_1920x1080.png?imwidth=1920",
}
GUIDE_IMAGES = {
    "torche-guetteur-nuit.webp": "https://www.mamytwink.com/upload/news/2026/septembre/28/wow-forever-guide-dobtention-du-jouet-torche-du-guetteur-de-nuit.jpg",
    "garde-veilleurs.webp": "https://www.mamytwink.com/upload/news/2026/septembre/28/torche-du-guetteur-de-nuit-01.jpg",
    "emplacement-garde-veilleurs.webp": "https://www.mamytwink.com/upload/news/2026/septembre/28/torche-du-guetteur-de-nuit.jpg",
    "torche-jouet-forever.webp": "https://www.mamytwink.com/upload/news/2026/septembre/28/torche-du-guetteur-de-nuit-jouet-wow-forever.jpg",
}


def save_webp(image: Image.Image, target: Path, max_width: int = 1672) -> None:
    image = image.convert("RGB")
    if image.width > max_width:
        height = round(image.height * max_width / image.width)
        image = image.resize((max_width, height), Image.Resampling.LANCZOS)
    image.save(target, "WEBP", quality=78, method=6)
    print(f"{target.name}: {target.stat().st_size // 1024} KiB")


for source_name in LOCAL_IMAGES:
    source = ASSETS / source_name
    save_webp(Image.open(source), source.with_suffix(".webp"))

for target_name, url in REMOTE_IMAGES.items():
    request = Request(url, headers={"User-Agent": "Renaissance asset optimizer"})
    with urlopen(request, timeout=30) as response:
        save_webp(Image.open(BytesIO(response.read())), ASSETS / target_name, max_width=1920)

# Une seule requête pour le héros : Horde à gauche, Alliance à droite,
# avec une transition progressive au centre.
horde = Image.open(ASSETS / "horde-forever.webp").convert("RGB").resize((1600, 900), Image.Resampling.LANCZOS)
alliance = Image.open(ASSETS / "alliance-forever.webp").convert("RGB").resize((1600, 900), Image.Resampling.LANCZOS)
mask = Image.new("L", (1600, 900))
for x in range(1600):
    alpha = max(0, min(255, round((x - 560) * 255 / 480)))
    for y in range(900):
        mask.putpixel((x, y), alpha)
hero = Image.composite(alliance, horde, mask)
hero.save(ASSETS / "hero-forever.webp", "WEBP", quality=74, method=6)
print(f"hero-forever.webp: {(ASSETS / 'hero-forever.webp').stat().st_size // 1024} KiB")

for target_name, url in GUIDE_IMAGES.items():
    request = Request(url, headers={"User-Agent": "Renaissance asset optimizer"})
    with urlopen(request, timeout=30) as response:
        save_webp(Image.open(BytesIO(response.read())), ASSETS / target_name, max_width=1400)
