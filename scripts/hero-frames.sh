#!/usr/bin/env bash
# Builds the home hero's scroll frames (public/hero-frames/{lg,sm}) from a clip.
#
#   scripts/hero-frames.sh <video> <calm-end> <end>
#
# Both are 0-based frame indexes in the source clip. <calm-end> is the last
# frame before the action starts (pomegranates.mp4: 44, the crack shows from
# 47); <end> is the last frame worth scrolling through (pomegranates.mp4: 154,
# after it the orchard is almost still).
#
# The player cross-fades between neighbouring frames so motion stays
# continuous at any scroll speed, and that only looks clean when neighbours
# barely differ. So both segments are motion-interpolated: the opening, which
# rests under the hero text, more densely on desktop. Afterwards, in
# app/(frontend)/home-page/hooks/use-scroll-frames.ts, set CLIP_CALM_END and
# CLIP_END, and keep FRAME_SETS' densities in step with the calls below.
#
# lg is landscape for desktop; sm is a centre portrait crop for phones. Frame
# sizes were picked by measuring scrub smoothness: larger frames drop frames
# while scrolling on ordinary laptop GPUs.
set -euo pipefail

src=$1
calm=$2
last=$3
out=${OUT:-public/hero-frames}
rate=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$src")
IFS=/ read -r num den <<<"$rate"

# Motion-interpolates to <factor> frames per clip frame.
interpolate() {
  echo "minterpolate=fps=$((num * $1))/$den:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1"
}

build() {
  local set=$1 geometry=$2 quality=$3 calm_x=$4 rest_x=$5
  local opening=$((calm * calm_x + 1)) rest=$(((last - calm) * rest_x))
  local webp=(-c:v libwebp -quality "$quality" -compression_level 6)
  rm -f "$out/$set"/*.webp
  mkdir -p "$out/$set"
  # Clip frames 0..calm. One extra input frame lets the last one interpolate.
  ffmpeg -hide_banner -loglevel error -i "$src" -an \
    -vf "trim=end_frame=$((calm + 2)),setpts=PTS-STARTPTS,$geometry,$(interpolate "$calm_x")" \
    -frames:v "$opening" "${webp[@]}" "$out/$set/%03d.webp"
  # Clip frames calm..last, minus the first output frame (the opening's last
  # frame again). The frame after `last` (or a copy of the clip's final frame)
  # lets `last` interpolate too.
  ffmpeg -hide_banner -loglevel error -i "$src" -an \
    -vf "trim=start_frame=$calm:end_frame=$((last + 2)),setpts=PTS-STARTPTS,tpad=stop=1:stop_mode=clone,$geometry,$(interpolate "$rest_x"),select='gte(n\,1)'" \
    -fps_mode vfr -frames:v "$rest" -start_number $((opening + 1)) "${webp[@]}" "$out/$set/%03d.webp"
  echo "$set: $(ls "$out/$set" | wc -l) frames (expected $((opening + rest))), $(du -sh "$out/$set" | cut -f1)"
}

build lg "scale=1440:810:flags=lanczos" 76 3 2 &
build sm "crop=ih*9/16:ih,scale=540:960:flags=lanczos" 74 2 2 &
wait
