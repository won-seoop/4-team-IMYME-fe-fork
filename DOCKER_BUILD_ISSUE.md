# 🐛 Docker 이미지 빌드 실패 이슈

## 문제 상황

Docker 이미지 빌드 시 Next.js 애플리케이션이 제대로 빌드되지 않는 문제가 발생합니다.

### 현재 상태
- 배포 방식을 **빌드 파일 전송 방식**에서 **Docker 컨테이너화**로 변경
- Docker 이미지 빌드는 성공하지만, 실제로는 Next.js 빌드가 실행되지 않음
- 컨테이너 실행 시 애플리케이션이 정상 작동하지 않음

## 원인 분석

### package.json의 build 스크립트 문제

현재 `package.json`의 build 스크립트가 placeholder로 되어 있음:

```json
"scripts": {
  "dev": "next dev",
  "prepare": "husky",
  "format": "prettier --write .",
  "lint": "eslint .",
  "test": "echo \"(add tests)\"",
  "build": "echo \"(add build)\"",  // ❌ 문제: 실제 빌드 실행 안 됨
}
```

### 영향 범위

1. **Dockerfile 빌드 과정**
   ```dockerfile
   RUN pnpm run build  # 이 명령이 "echo (add build)"만 실행됨
   ```

2. **기존 CI/CD는 정상 작동**
   - 현재 GitHub Actions에서는 `pnpm next build` 직접 실행
   - 따라서 기존 배포 방식에서는 문제 없음
   ```yaml
   - name: Build
     run: pnpm next build  # package.json의 build 스크립트 우회
   ```

3. **Docker 배포 시 문제 발생**
   - Docker는 package.json의 build 스크립트에 의존
   - Next.js 빌드가 실행되지 않아 `.next` 폴더가 생성되지 않음
   - 컨테이너 실행 시 애플리케이션 작동 불가

## 해결 방법

### ✅ 권장: package.json 수정

`package.json`의 scripts 섹션을 다음과 같이 수정:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",    // ✅ 수정
  "start": "next start",    // ✅ 추가
  "prepare": "husky",
  "format": "prettier --write .",
  "lint": "eslint .",
  "test": "echo \"(add tests)\""
}
```

### 장점
- ✅ 표준 Next.js 프로젝트 구조
- ✅ 로컬 개발 환경에서도 `pnpm build`, `pnpm start` 사용 가능
- ✅ Docker 이미지 빌드 정상 작동
- ✅ 기존 CI/CD도 계속 작동

### 대안: Dockerfile 임시 수정 (비추천)

```dockerfile
# 기존
RUN pnpm run build

# 임시 방법
RUN pnpm next build
```

**비추천 이유:**
- ❌ package.json 표준 구조 위반
- ❌ 로컬 개발 환경과 불일치
- ❌ 근본적인 해결 아님

## 재현 방법

```bash
# 1. Docker 이미지 빌드 시도
./build.sh release

# 2. 빌드 로그 확인
# 출력: "(add build)" <- 실제 Next.js 빌드 실행 안 됨

# 3. 컨테이너 실행 시도
docker run -p 3000:3000 imyme-frontend:release
# 에러 발생: .next 폴더 없음
```

## 체크리스트

- [ ] package.json의 build 스크립트 수정
- [ ] package.json에 start 스크립트 추가
- [ ] 로컬에서 Docker 이미지 빌드 테스트
- [ ] 컨테이너 실행 및 동작 확인
- [ ] PR 생성 및 리뷰 요청

## 관련 파일

- `package.json` (scripts 섹션)
- `Dockerfile` (RUN pnpm run build 라인)
- `.github/workflows/dev.yml` (참고: 직접 next build 실행)
- `.github/workflows/prod.yml` (참고: 직접 next build 실행)

## 우선순위

🔴 **High Priority**

Docker 배포로 전환하기 전에 반드시 수정 필요. 현재 상태로는 Docker 이미지가 제대로 작동하지 않습니다.

---

**작성일:** 2026-02-12
**작성자:** DevOps Team
**관련 이슈:** Docker 컨테이너화 작업
