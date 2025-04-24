#!/bin/bash

set -e  # 에러 발생 시 스크립트 즉시 중단

cd /home/hjj0106/hjj-0106 || {
  echo "❌ 디렉토리 이동 실패"
  exit 1
}

echo "📁 현재 디렉토리: $(pwd)"

echo "🌀 최신 코드 가져오는 중..."
git fetch origin main 2>&1
git checkout main
git reset --hard origin/main

echo "✅ 코드 업데이트 완료"

echo "📦 Docker 재빌드 및 재시작 중..."
docker-compose down
docker-compose up --build -d

echo "🚀 배포 완료"

