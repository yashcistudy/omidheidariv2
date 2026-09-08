#!/usr/bin/env bash
set -euo pipefail

output_dir="${1:-public/assets/dice}"
mkdir -p "$output_dir"

draw_pips() {
  local face="$1"
  case "$face" in
    1) printf "circle 256,256 279,256" ;;
    2) printf "circle 178,178 201,178 circle 334,334 357,334" ;;
    3) printf "circle 178,178 201,178 circle 256,256 279,256 circle 334,334 357,334" ;;
    4) printf "circle 178,178 201,178 circle 334,178 357,178 circle 178,334 201,334 circle 334,334 357,334" ;;
    5) printf "circle 178,178 201,178 circle 334,178 357,178 circle 256,256 279,256 circle 178,334 201,334 circle 334,334 357,334" ;;
    6) printf "circle 178,164 201,164 circle 334,164 357,164 circle 178,256 201,256 circle 334,256 357,256 circle 178,348 201,348 circle 334,348 357,348" ;;
  esac
}

for face in 1 2 3 4 5 6; do
  pip_shapes="$(draw_pips "$face")"
  convert -size 512x512 xc:none \
    \( -size 360x360 xc:black -fill black -draw "roundrectangle 8,8 352,352 54,54" -blur 0x24 \) \
    -geometry +76+94 -composite \
    \( public/assets/paper-texture.webp -resize 360x360! -fill '#f2ede3' -colorize 47 \
       \( -size 360x360 xc:none -fill white -draw "roundrectangle 2,2 357,357 52,52" \) \
       -alpha off -compose CopyOpacity -composite \
       -stroke '#756e66' -strokewidth 3 -fill none -draw "roundrectangle 3,3 356,356 52,52" \
       -stroke 'rgba(255,255,255,0.72)' -strokewidth 5 -draw "roundrectangle 13,13 346,346 44,44" \) \
    -geometry +76+68 -compose over -composite \
    -fill '#171619' -stroke '#09090a' -strokewidth 2 -draw "$pip_shapes" \
    -fill 'rgba(255,255,255,0.16)' -stroke none -draw "roundrectangle 91,84 421,168 36,36" \
    -quality 92 "$output_dir/die-$face.png"
done

