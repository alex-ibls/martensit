#!/usr/bin/env python3
"""Deskew and grade the landing-page photos to one graphite/glass look."""

from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np

ASSETS = Path(
    "/Users/bocharovalexander/.cursor/projects/Users-bocharovalexander/assets"
)
DEST = Path("/Users/bocharovalexander/Завод/public/portfolio")
OG = Path("/Users/bocharovalexander/Завод/public/og/cover.jpg")
MAX_EDGE = 1800

# Strict set from the latest user batch (21 files).
SOURCES = [
    "5215290882897158414-d3380098-6285-4185-a5fd-d1a6b5e69aa8.png",
    "5215290882897158422-77e68966-beec-4fe8-a22c-beb6a323effd.png",
    "5215290882897158425-9bac6187-7523-4649-9c58-86558ec2187d.png",
    "5215290882897158420-669e70b0-3546-4145-8308-994015875ba2.png",
    "5215290882897158421-7d1d0775-abff-4429-8c29-f291206c762e.png",
    "5215290882897158424-306b51ee-8e7c-49c7-a3f0-6577bacdf304.png",
    "5215290882897158427-5e0fd4bd-dab5-4edd-91b8-db7a2d4e71d7.png",
    "5215290882897158429-6430cc9d-6efa-4a55-89c5-a26dc9c275f0.png",
    "5215290882897158413-8f0e10e0-867d-4bca-8885-1afb4c4494d2.png",
    "5215290882897158409-de2b3ef8-fcf7-44be-a03d-2ba9be9d055c.png",
    "5215290882897158417-7084a642-86fe-46d1-b667-6227cf9cdd68.png",
    "5215290882897158415-899aa392-736e-4e9d-bbdb-2177a8343215.png",
    "5215290882897158400-7d311fd5-a1a5-445f-86d4-cbdd4edcb755.png",
    "5215290882897158399-82fae105-b8e6-4db0-a466-3c30e9ee0d26.png",
    "5215290882897158419-96bbf210-5556-45ed-aeff-a7fdb6d2ac5f.png",
    "5215290882897158430-249a2294-b745-42fb-8856-392ede17bab3.png",
    "5215290882897158401-088364e8-1164-4266-b271-bf192167ddfe.png",
    "5215290882897158402-04617d3d-bac7-4ce1-949c-8ff78f7a2ffc.png",
    "5215290882897158403-791cb0a4-4866-40ac-8fc9-92a6ca07b46d.png",
    "5215290882897158407-cde9e60a-1314-4156-b071-864b4ebbfca5.png",
    "5215290882897158404-b6617398-42ad-464e-8ad7-7a9fa8203d8a.png",
]

NAMES = [
    "01-stained-glass",
    "02-industrial",
    "03-mural-street",
    "04-facade-snow",
    "05-office",
    "06-mural-kitten",
    "07-radius-facade",
    "08-window-lights",
    "09-classical",
    "10-terrace",
    "11-construction",
    "12-window-winter",
    "13-vestibule",
    "14-highrise",
    "15-panorama",
    "16-brick-facade",
    "17-house-build",
    "18-house-dusk",
    "20-entrance",
    "21-pvc-window",
    "22-estate",
]


def detect_tilt(bgr: np.ndarray) -> float:
    h, w = bgr.shape[:2]
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (5, 5), 0)
    scale = 900 / max(h, w)
    if scale < 1:
        gray = cv2.resize(gray, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
    edges = cv2.Canny(gray, 60, 160, L2gradient=True)
    min_len = int(min(gray.shape[:2]) * 0.22)
    lines = cv2.HoughLinesP(
        edges,
        1,
        np.pi / 180,
        threshold=70,
        minLineLength=min_len,
        maxLineGap=18,
    )
    if lines is None:
        return 0.0
    tilts: list[float] = []
    weights: list[float] = []
    for x1, y1, x2, y2 in lines[:, 0]:
        length = float(np.hypot(x2 - x1, y2 - y1))
        ang = float(np.degrees(np.arctan2(y2 - y1, x2 - x1)))
        if ang > 90:
            ang -= 180
        elif ang < -90:
            ang += 180
        if abs(ang) <= 45:
            tilt = ang
        else:
            tilt = ang - 90 if ang > 0 else ang + 90
        if abs(tilt) <= 7.5:
            tilts.append(tilt)
            weights.append(length)
    if not tilts:
        return 0.0
    angle = float(np.average(tilts, weights=weights))
    return float(np.clip(angle, -6.0, 6.0))


def rotate_crop(bgr: np.ndarray, angle: float) -> np.ndarray:
    if abs(angle) < 0.18:
        return bgr
    h, w = bgr.shape[:2]
    center = (w / 2.0, h / 2.0)
    matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(
        bgr,
        matrix,
        (w, h),
        flags=cv2.INTER_CUBIC,
        borderMode=cv2.BORDER_REFLECT_101,
    )
    pad_x = max(4, int(w * (0.012 + abs(angle) * 0.008)))
    pad_y = max(4, int(h * (0.012 + abs(angle) * 0.008)))
    return rotated[pad_y : h - pad_y, pad_x : w - pad_x]


def resize_max(bgr: np.ndarray, max_edge: int = MAX_EDGE) -> np.ndarray:
    h, w = bgr.shape[:2]
    longest = max(h, w)
    if longest <= max_edge:
        return bgr
    scale = max_edge / longest
    return cv2.resize(bgr, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)


def grade(bgr: np.ndarray) -> np.ndarray:
    img = bgr.astype(np.float32) / 255.0
    means = img.reshape(-1, 3).mean(axis=0)
    gray = float(means.mean())
    # Cool graphite white-balance: slightly more blue, less red.
    target = np.array([gray * 1.03, gray * 0.99, gray * 0.94], dtype=np.float32)
    scale = np.clip(target / (means + 1e-5), 0.88, 1.14)
    img *= scale

    lab = cv2.cvtColor(np.clip(img * 255, 0, 255).astype(np.uint8), cv2.COLOR_BGR2LAB).astype(
        np.float32
    )
    l_ch, a_ch, b_ch = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=1.6, tileGridSize=(8, 8))
    l_ch = clahe.apply(np.clip(l_ch, 0, 255).astype(np.uint8)).astype(np.float32)
    l_ch = np.clip((l_ch - 128.0) * 1.07 + 124.0, 0, 255)
    a_ch = 128.0 + (a_ch - 128.0) * 0.72
    b_ch = 128.0 + (b_ch - 128.0) * 0.70 - 5.0
    graded = cv2.merge(
        [
            np.clip(l_ch, 0, 255),
            np.clip(a_ch, 0, 255),
            np.clip(b_ch, 0, 255),
        ]
    ).astype(np.uint8)
    return cv2.cvtColor(graded, cv2.COLOR_LAB2BGR)


def match_to_target(bgr: np.ndarray, target_lab: np.ndarray) -> np.ndarray:
    lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB).astype(np.float32)
    mean = lab.reshape(-1, 3).mean(axis=0)
    shift = (target_lab - mean) * np.array([0.35, 0.55, 0.55], dtype=np.float32)
    lab += shift
    return cv2.cvtColor(np.clip(lab, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)


def save_jpg(path: Path, bgr: np.ndarray) -> None:
    cv2.imwrite(str(path), bgr, [int(cv2.IMWRITE_JPEG_QUALITY), 90])


# Pixel boxes on the processed JPGs (x1, y1, x2, y2).
PLATE_BOXES = {
    "03-mural-street": (28, 612, 102, 640),
}
DRIVER_BOXES = {
    "03-mural-street": (0, 482, 150, 592),
}


def paint_plate(bgr: np.ndarray, box: tuple[int, int, int, int]) -> None:
    x1, y1, x2, y2 = box
    sample = bgr[max(0, y1 - 14) : y1, x1:x2]
    if sample.size:
        color = tuple(int(c) for c in sample.mean(axis=(0, 1)))
    else:
        color = (28, 28, 28)
    cv2.rectangle(bgr, (x1, y1), (x2, y2), color, thickness=-1)
    pad = 3
    ry1, ry2 = max(0, y1 - pad), min(bgr.shape[0], y2 + pad)
    rx1, rx2 = max(0, x1 - pad), min(bgr.shape[1], x2 + pad)
    bgr[ry1:ry2, rx1:rx2] = cv2.GaussianBlur(bgr[ry1:ry2, rx1:rx2], (5, 5), 0)


def blur_driver(bgr: np.ndarray, box: tuple[int, int, int, int]) -> None:
    x1, y1, x2, y2 = box
    roi = bgr[y1:y2, x1:x2]
    blurred = cv2.GaussianBlur(roi, (71, 71), 0)
    blurred = cv2.GaussianBlur(blurred, (71, 71), 0)
    h, w = roi.shape[:2]
    mask = np.zeros((h, w), np.float32)
    inset = 6
    cv2.rectangle(mask, (inset, inset), (max(w - inset - 1, inset), max(h - inset - 1, inset)), 1, -1)
    mask = cv2.GaussianBlur(mask, (15, 15), 0)[:, :, None]
    roi[:] = (blurred * mask + roi * (1.0 - mask)).astype(np.uint8)


def redact_privacy(name: str, bgr: np.ndarray) -> np.ndarray:
    out = bgr.copy()
    if name in PLATE_BOXES:
        paint_plate(out, PLATE_BOXES[name])
    if name in DRIVER_BOXES:
        blur_driver(out, DRIVER_BOXES[name])
    return out


def main() -> None:
    DEST.mkdir(parents=True, exist_ok=True)
    for old in DEST.glob("*"):
        old.unlink()

    processed: list[tuple[str, np.ndarray]] = []
    for src_name, dest_name in zip(SOURCES, NAMES):
        src = ASSETS / src_name
        bgr = cv2.imread(str(src), cv2.IMREAD_COLOR)
        if bgr is None:
            raise SystemExit(f"Cannot read {src}")
        tilt = detect_tilt(bgr)
        out = grade(resize_max(rotate_crop(bgr, tilt)))
        processed.append((dest_name, out))
        print(f"{dest_name}: tilt {tilt:+.2f}°  {out.shape[1]}x{out.shape[0]}")

    means = np.array(
        [cv2.cvtColor(img, cv2.COLOR_BGR2LAB).reshape(-1, 3).mean(axis=0) for _, img in processed],
        dtype=np.float32,
    )
    target = np.median(means, axis=0)
    print("target LAB", target.tolist())

    for dest_name, img in processed:
        unified = redact_privacy(dest_name, match_to_target(img, target))
        save_jpg(DEST / f"{dest_name}.jpg", unified)

    dusk = next(img for name, img in processed if name == "18-house-dusk")
    og = cv2.resize(dusk, (1200, 630), interpolation=cv2.INTER_AREA)
    OG.parent.mkdir(parents=True, exist_ok=True)
    if OG.with_suffix(".png").exists():
        OG.with_suffix(".png").unlink()
    save_jpg(OG, match_to_target(og, target))
    print("wrote", len(processed), "photos + og")


if __name__ == "__main__":
    main()
