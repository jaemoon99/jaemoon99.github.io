import type { ProjectDetail } from "@/app/projects/[slug]/project-detail-client";

export const projectsData: ProjectDetail[] = [
  {
    slug: "dsink",
    title: "Design Sink",
    overview:
      "인테리어 홍보 사이트입니다. 디자인부터 배포까지 전 과정을 담당했으며 관리자 페이지를 통해 인테리어 사진을 관리할 수 있습니다.",
    period: "2025.07 - 2025.09",
    teamSize: "1명",
    contribution: 100,
    githubUrl: "https://github.com/designsink",
    liveUrl: "https://dsink.kr/",
    image: "/dsink.png",
    architecture: "/dsink-architecture.png",
    erd: "/dsink-erd.png",
    techStack: [
      {
        name: "Spring Boot",
        reason:
          "짧은 개발 기간 내에 빠르게 구축하기 위해 가장 익숙하고 다양한 의존성을 통합으로 관리할 수 있어 선택했습니다.",
      },
      {
        name: "Next.js",
        reason:
          "이미지가 많고 검색 노출이 중요한 인테리어 홍보 사이트 특성에 맞는 SEO 최적화와 빠른 초기 로딩 속도를 확보할 수 있어 선택했습니다.",
      },
      {
        name: "MySQL",
        reason:
          "짧은 개발 기간 내에 빠르게 구축하기 위해 가장 익숙하고 구축/운영 리스크가 낮아 선택했습니다.",
      },
      {
        name: "GitHub Actions",
        reason:
          "서버 자원이 제한된 상황에서 인프라 비용과 리소스 사용을 최소화하기 위해 선택했습니다.",
      },
    ],
    responsibilities: [
      {
        title: "프로젝트 디자인 설계",
        description:
          "고객 요구사항과 v0 AI를 활용해 프로젝트의 전체적인 디자인을 설계했습니다.",
      },
      {
        title: "프로젝트 구조 설계 및 각종 컴포넌트 개발",
        description:
          "확장성과 유지보수성을 고려하여 프로젝트의 초기 구조를 설계했으며 재사용 가능한 UI 컴포넌트를 개발하여 일관된 디자인 시스템을 구축했습니다.",
      },
      {
        title: "Draggable 기반 사진 편집(정렬) 구현",
        description:
          "dnd-kit 라이브러리를 활용해 사용자가 직관적으로 사진을 드래그하여 순서를 변경할 수 있는 편집 기능을 구현했습니다.",
      },
      {
        title: "JPQL 기반 페이지네이션 무한 스크롤 구현",
        description:
          "Pageable, Sort, Slice를 활용해 무한 스크롤을 구현했으며 불필요한 count 쿼리를 제거하고 hasNext로 다음 페이지 로딩 여부를 판단했습니다.",
      },
      {
        title: "Spring Security 기반 인증/인가 구현",
        description:
          "Spring Security를 활용해 사용자의 회원가입, 로그인, 로그아웃 기능을 구현하고 JWT 토큰을 발급하여 API 요청에 대한 인증 및 인가 처리를 구현했습니다.",
      },
      {
        title: "Git Action 기반 CI/CD 파이프라인 작성",
        description:
          "GitHub Actions를 활용해 main 브랜치에 코드가 푸시/머지될 때마다 자동으로 애플리케이션을 빌드, 테스트, 배포하는 CI/CD 파이프라인을 구축했습니다.",
      },
      {
        title: "AWS EC2/RDS 기반 운영서버/DB 구축",
        description:
          "AWS EC2로 애플리케이션 서버를 운영하고 데이터베이스는 Amazon RDS에서 관리했습니다.",
      },
    ],
    troubleshooting: [
      {
        title: "이미지 지연 로딩",
        problem:
          "인테리어 이미지 목록 조회 시 고해상도 이미지로 인해 로딩 속도가 느려 사용자 경험이 저하되는 문제가 발생했습니다.",
        cause:
          "원본 이미지를 목록에 그대로 사용해 페이지네이션을 적용했음에도 요청량이 커졌고 고해상도 이미지가 동시에 로드되며 초기 렌더링이 지연되었습니다.",
        solution:
          "이미지 업로드 시 원본과 분리해 썸네일을 WebP로 저장하고 목록 조회에는 썸네일만 제공하도록 변경했습니다. 그 결과 목록 화면의 초기 로딩 시간을 약 5초에서 0.2초 이내로 단축했습니다.",
        beforeCode: `// Before: 원본 이미지를 저장하여 공용으로 사용
try {
  // 저장
  Path origDir = rootLocation.resolve("original");
  Files.createDirectories(origDir);
  Path origPath = origDir.resolve(originalFilename);

  try (InputStream in = file.getInputStream()) {
    Files.copy(in, origPath, StandardCopyOption.REPLACE_EXISTING);
  }
  
} catch (IOException ex) {
  throw new CustomException(ErrorCode.FILE_STORAGE_ERROR);
}
        `,
        afterCode: `// After: 원본/썸네일 저장 분리
try {
  // 원본 저장
  Path origDir = rootLocation.resolve("original");
  Files.createDirectories(origDir);
  Path origPath = origDir.resolve(originalFilename);

  try (InputStream in = file.getInputStream()) {
    Files.copy(in, origPath, StandardCopyOption.REPLACE_EXISTING);
  }

  // 썸네일 생성 및 저장
  Path thumbDir = rootLocation.resolve("thumbnail");
  Files.createDirectories(thumbDir);
  Path thumbPath = thumbDir.resolve(thumbnailFilename);

  // WebP로 변환해주는 메서드
  convertToWebpWithLossless(origPath.toFile(), thumbPath.toFile());

} catch (IOException ex) {
  throw new CustomException(ErrorCode.FILE_STORAGE_ERROR);
}

// convertToWebpWithLossless 메서드 로직
try {
  // scrimage 로더에서 불러와서, 크기 조정 후 lossless WebP 로 출력
  ImmutableImage.loader()
    .fromFile(originalFile)
    .scaleTo(1280, 720)
    .output(WebpWriter.DEFAULT.withLossless(), targetFile);
} catch (Exception e) {
  throw new CustomException(ErrorCode.FILE_STORAGE_ERROR);
}
`,
        tags: ["Image Optimization", "Thumbnail", "WebP"],
        beforeLanguage: "java",
        afterLanguage: "java",
      }
    ],
  },
  {
    slug: "achacha",
    title: "아차차",
    overview:
      "기프티콘 관리 및 공유 애플리케이션입니다. 흩어져 있는 기프티콘을 한 곳에서 간편하게 관리하고 주변 매장 알림을 통해 효율적으로 사용할 수 있습니다.",
    period: "2025.04 - 2025.05",
    teamSize: "6명 (프론트엔드 3, 백엔드 3)",
    contribution: 30,
    githubUrl: "https://github.com/jaemoon99/achacha",
    liveUrl: "https://play.google.com/store/apps/details?id=com.koup28.achacha_app&hl=ko",
    image: "/achacha.png",
    architecture: "/achacha-architecture.png",
    erd: "/achacha-erd.png",
    techStack: [
      {
        name: "Spring Boot",
        reason:
          "팀 내에서 가장 선호하는 백엔드 프레임워크로 취업 고려와 학습 곡선이 낮아 선택했습니다.",
      },
      {
        name: "MySQL",
        reason:
          "서비스 규모가 크지 않고 복잡한 DB 기능보다 안정적인 운영과 빠른 개발을 위해 선택했습니다.",
      },
      {
        name: "Selenium",
        reason:
          "실제 사용자 인터랙션(클릭/스크롤)을 재현해 사람이 직접 조회했을 때와 같은 결과를 확보할 수 있어 선택했습니다.",
      },
    ],
    responsibilities: [
      {
        title: "offset기반 페이지네이션 및 기타 api 구현",
        description:
          "QueryDSL, Slice, OrderSpecifier, Pageable을 활용해 필터, 정렬이 있는 목록 조회 및 기타 api를 구현했습니다.",
      },
      {
        title: "알림을 위한 다양한 스케줄러 구현",
        description:
          "TaskScheduler, Spring Schedule 등을 활용해 유효기간 임박 알림, 사용완료 여부 알림 스케줄러를 구현했습니다.",
      },
      {
        title: "기프티콘을 지원하는 다양한 브랜드 크롤러 구현",
        description: "selenium을 활용해 기프티콘을 지원하는 다양한 브랜드 크롤러를 구현했습니다.",
      },
    ],
    troubleshooting: [
      {
        title: "JPQL 페이지네이션 쿼리 복잡도 개선",
        problem:
          "JPQL 쿼리가 50줄이 넘어가면서 유지보수가 어려워지고, 동적 쿼리 작성 시 가독성이 떨어지는 문제가 발생했습니다.",
        cause:
          "복잡한 조건 분기(ALL / MY_BOX / SHARE_BOX), 필터(type, 만료 포함 여부 등)가 한 JPQL 문자열에 모두 들어가면서 쿼리가 비정상적으로 길어졌습니다.",
        solution:
          "@Query 기반 JPQL을 QueryDSL 커스텀 레포지토리로 전환해, 동적 조건을 코드 레벨에서 조립하도록 변경했습니다. 이를 통해 가독성과 유지보수성을 향상시켰습니다.",
        beforeCode: `// Before: 수정 전 JPQL 쿼리 3개 中 1
@Query("""
SELECT new com.eurachacha.achacha.application.port.input.gifticon.dto.response.AvailableGifticonResponseDto(
	g.id,
  g.name,
  g.type,
  g.expiryDate,
  b.id,
  b.name,
  CASE WHEN g.sharebox.id IS NULL THEN 'MY_BOX' ELSE 'SHARE_BOX' END,
  u.id,
  u.name,
  g.sharebox.id,
  sb.name,
  (
    SELECT f.path
      FROM File f
      WHERE f.referenceEntityType = 'GIFTICON'
        AND f.referenceEntityId = g.id
        AND f.type = :fileType
        AND f.id = (
          SELECT MIN(f2.id)
            FROM File f2
          WHERE f2.referenceEntityType = 'GIFTICON'
            AND f2.referenceEntityId = g.id
            AND f2.type = :fileType
        )
  )
)
FROM Gifticon g
JOIN g.brand b
JOIN g.user u
LEFT JOIN g.sharebox sb
WHERE g.isDeleted = false
AND g.isUsed = false
AND (g.remainingAmount > 0 OR g.remainingAmount = -1)
AND g.expiryDate > CURRENT_DATE
AND (
  (:#{#scope.name()} = 'ALL' AND (
    g.user.id = :userId OR
    (g.sharebox.id IS NOT NULL AND 
      EXISTS (
        SELECT p
        FROM Participation p
        WHERE p.sharebox.id = g.sharebox.id
          AND p.user.id = :userId
      ))
  )) OR
  (:#{#scope.name()} = 'MY_BOX' AND g.sharebox.id IS NULL AND g.user.id = :userId) OR
  (:#{#scope.name()} = 'SHARE_BOX' AND g.sharebox.id IS NOT NULL AND 
    (
      g.user.id = :userId OR
      EXISTS (
        SELECT p
        FROM Participation p
        WHERE p.sharebox.id = g.sharebox.id
          AND p.user.id = :userId
      )
    )
  )
)
AND (:type IS NULL OR g.type = :type)
""")`,
        afterCode: `// After: QueryDSL 기반 커스텀 레포지토리 구현체
public Slice<Gifticon> findAvailableGifticons(Integer userId, GifticonScopeType scope, GifticonType type, boolean includeExpired, Pageable) {
  QGifticon qGifticon = QGifticon.gifticon;
  QBrand qBrand = QBrand.brand;
  QUser qUser = QUser.user;
  QSharebox qSharebox = QSharebox.sharebox;
  QParticipation qParticipation = QParticipation.participation;

  // 조회 쿼리 구성 - Gifticon 엔티티를 루트로 조회, fetchJoin로 연관 엔티티 함께 조회(N+1 문제 방지)
  List<Gifticon> content = queryFactory
    .selectFrom(qGifticon)
    .join(qGifticon.brand, qBrand).fetchJoin()
    .join(qGifticon.user, qUser).fetchJoin()
    .leftJoin(qGifticon.sharebox, qSharebox).fetchJoin()
    .where( // QueryDSL은 null 조건을 자동으로 무시해주므로 typeCondition/expiryCondition 처럼 Optional 조건을 깔끔하게 처리 가능
      qGifticon.isUsed.eq(false), // 사용 완료가 아닌 기프티콘만 조회
      scopeCondition(scope, userId, qGifticon, qParticipation), // scope(ALL / MY_BOX / SHARE_BOX)에 따라 조회 범위를 달리 적용
      typeCondition(type, qGifticon), // type 필터가 존재할 때만 적용 (null이면 조건 미적용)
      expiryCondition(includeExpired, qGifticon) // 만료 포함 여부에 따라 expiryDate 조건 적용/미적용
    )
    .offset(pageable.getOffset())
    .limit(pageable.getPageSize() + 1) // pageSize + 1로 조회해서 "다음 페이지가 있는지"를 판단(Slice 방식)
    .orderBy(QueryUtils.getOrderSpecifiers(pageable.getSort(), qGifticon))
    .fetch();

  boolean hasNext = false;
  if (content.size() > pageable.getPageSize()) {
    content = content.subList(0, pageable.getPageSize());
    hasNext = true;
  }
  
  return new SliceImpl<>(content, pageable, hasNext);
}

// scope 값(ALL / MY_BOX / SHARE_BOX)에 따라 조회 범위 조건을 선택하는 메서드
private BooleanExpression scopeCondition(GifticonScopeType scope, Integer userId, QGifticon qGifticon, QParticipation qParticipation) {
  if (scope == GifticonScopeType.ALL) {
    return allScopeCondition(userId, qGifticon, qParticipation);
  } else if (scope == GifticonScopeType.MY_BOX) {
    return myBoxScopeCondition(userId, qGifticon);
  } else if (scope == GifticonScopeType.SHARE_BOX) {
    return shareBoxScopeCondition(userId, qGifticon, qParticipation);
  }
  return null;
}

// 타입 조건 메서드
private BooleanExpression typeCondition(GifticonType type, QGifticon qGifticon) {
  return type == null ? null : qGifticon.type.eq(type);
}

// 유효기간 조건 메서드
private BooleanExpression expiryCondition(boolean includeExpired, QGifticon qGifticon) {
  if (includeExpired) return null;
  DateExpression<LocalDate> today = Expressions.dateTemplate(LocalDate.class, "CURRENT_DATE");
  return qGifticon.expiryDate.isNull().or(qGifticon.expiryDate.gt(today));
}
`,
        tags: ["Query Optimization", "Readability", "Maintainability"],
        beforeLanguage: "java",
        afterLanguage: "java",
      },
    ],
  },
  {
    slug: "uptention",
    title: "Uptention",
    overview:
      "솔라나 기반 기업용 업무 집중 애플리케이션입니다. 업무 중 디지털 디톡스를 통해 코인을 획득하고 이를 활용해 기업 내 복지 혜택을 누릴 수 있습니다.",
    period: "2025.02 - 2025.04",
    teamSize: "6명 (프론트엔드 2, 백엔드 3)",
    contribution: 40,
    githubUrl: "https://github.com/jaemoon99/uptention",
    image: "/uptention.png",
    architecture: "/uptention-architecture.png",
    erd: "/uptention-erd.png",
    techStack: [
      {
        name: "Solana",
        reason:
          "Ethereum 대비 빠른 트랜잭션 처리 속도와 낮은 수수료로 기업용 애플리케이션에 적합해 선택했습니다.",
      },
      {
        name: "Anchor",
        reason:
          "Solana 온체인 프로그램 표준 프레임워크로 계정 검증/클라이언트 연동(IDL)을 자동화해 개발 속도와 안정성을 확보할 수 있어 선택했습니다.",
      },
      {
        name: "Spring Boot",
        reason:
          "팀 내에서 가장 선호하는 백엔드 프레임워크로 취업 고려와 학습 곡선이 낮아 선택했습니다.",
      },
      {
        name: "Express.js",
        reason:
          "Anchor는 TypeScript 기반 SDK 중심이라 Node 환경에서 연동이 안정적이기 때문에 선택했습니다.",
      },
      {
        name: "MySQL",
        reason:
          "서비스 규모가 크지 않고 복잡한 DB 기능보다 안정적인 운영과 빠른 개발을 위해 선택했습니다.",
      },
    ],
    responsibilities: [
      {
        title: "애플리케이션 자체 코인 및 NFT 생성",
        description:
          "metaplex와 solana-web3 라이브러리를 활용해 솔라나 기반 자체 코인 및 NFT를 생성했습니다.",
        links: [
          {
            name: "토큰 링크",
            url: "https://explorer.solana.com/address/5ymZGsCFkfSzZN6AbwMWU2v4A4c5yeqmGj1vSpRWg75n?cluster=devnet",
          },
          {
            name: "NFT 링크",
            url: "https://solscan.io/token/B4GAGAyrur1oRPcCeK13aar1Pm5TwHUj3WwXrMTDPrar?cluster=devnet",
          },
        ],
      },
      {
        title: "토큰 및 NFT 전송 프로그램 구현",
        description:
          "anchor/rust를 활용해 코인 및 NFT 전송 온체인 프로그램을 구현했습니다.",
        links: [
          {
            name: "프로그램 링크",
            url: "https://explorer.solana.com/address/GJfn4PnccEkruMkw6ngzPNhz1NH727bFZvpyDWu3YzL?cluster=devnet",
          },
        ],
      },
      {
        title: "DB 트랜잭션과 온체인 트랜잭션의 원자성 보장을 위한 브릿지 서버 구현",
        description:
          "DB 트랜잭션과 온체인 트랜잭션을 하나의 작업 단위로 묶어 원자성을 보장하기 위해 별도로 Express 서버를 구현했습니다.",
      },
    ],
    troubleshooting: [
      {
        title: "Anchor 프로그램의 JS 외부 호출 연동 오류",
        problem:
          "Solana CLI로 Anchor 프로그램을 호출할 때는 정상 동작하지만, Express.js 서버에서 JS SDK로 호출 시 연동이 되지 않는 문제가 발생했습니다.",
        cause:
          "버전 차이로 Program 초기화 방식이 맞지 않아(JS에서 programId를 중복 전달) 호출이 실패했습니다.",
        solution:
          "버전에 맞게 Program 생성 로직을 수정해 최신 기준으로 programId를 별도 전달하지 않도록 변경했습니다.",
        beforeCode: `// Before: 구버전 IDL 방식
const connection = new Connection("https://api.devnet.solana.com", "confirmed"); // 블록체인 네트워크(devnet)와 연결 설정
const provider = new anchor.AnchorProvider(
  connection,
  new anchor.Wallet(existingSigner), // 트랜잭션 서명자(송신자)
  {
    preflightCommitment: "confirmed",
  }
);

anchor.setProvider(provider);

const idl = JSON.parse(fs.readFileSync("./anchor_token_transfer.json", "utf8")); // IDL 파일 로드
const programId = new PublicKey("GJfn4PnccEkruMkw6ngzPNhz1NH727bFZvpyDWu3YzL"); // 온체인 프로그램 주소
const program = new anchor.Program(idl, programId, provider); // 프로그램 객체 생성
`,
        afterCode: `// After: 최신버전 IDL 방식
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const provider = new anchor.AnchorProvider(
  connection,
  new anchor.Wallet(existingSigner),
  {
    preflightCommitment: "confirmed",
  }
);

anchor.setProvider(provider);

const idl = JSON.parse(fs.readFileSync("./anchor_token_transfer.json", "utf8")); // IDL 파일 로드(파일에 programId 포함)
const program = new anchor.Program(idl, provider);
`,
        tags: ["IDL", "Version Mismatch"],
        beforeLanguage: "typescript",
        afterLanguage: "typescript",
      }
    ],
  },
  {
    slug: "grimtalk",
    title: "GrimTalk",
    overview:
      "그림을 배우고 싶고 본인의 그림 실력으로 수익을 창출하고 싶은 사람들을 위한 플랫폼입니다. 라이브 스트리밍을 통해 실시간으로 그림을 배우고 완성된 작품은 AI 기반 유사도 분석을 통해 본인의 실력을 평가받을 수 있습니다.",
    period: "2025.01 - 2025.02",
    teamSize: "6명 (프론트엔드 3, 백엔드 3)",
    contribution: 40,
    githubUrl: "https://github.com/color-chill-guys/grimtalk",
    image: "/grimtalk.png",
    architecture: "/grimtalk-architecture.png",
    erd: "/grimtalk-erd.png",
    techStack: [
      {
        name: "OpenVidu",
        reason:
          "Kurento 대비 설치 및 설정이 간편하고 연결된 부가 서비스(Redis)를 별도로 구축하지 않고 활용할 수 있어 선택했습니다.",
      },
      {
        name: "OpenCV",
        reason:
          "이미지 유사도 측정에 필요한 히스토그램(색상), Canny/Hough(선), SSIM(구조) 같은 검증된 알고리즘을 빠르게 구현할 수 있어 선택했습니다.",
      },
      {
        name: "Spring Boot",
        reason: "팀 내에서 가장 선호하는 백엔드 프레임워크로 취업 고려와 학습 곡선이 낮아 선택했습니다.",
      },
      
      {
        name: "MySQL",
        reason:
          "서비스 규모가 크지 않고 복잡한 DB 기능보다 안정적인 운영과 빠른 개발을 위해 선택했습니다.",
      },
      {
        name: "Redis",
        reason:
          "OpenVidu 구축 시 함께 구축되어 개발 시간을 단축할 수 있어 선택했습니다.",
      },
      
    ],
    responsibilities: [
      {
        title: "라이브 기능을 위한 Openvidu v3 구축",
        description:
          "WebRTC 오픈소스인 Openvidu를 활용해 라이브 스트리밍 및 채팅 기능을 구현했습니다.",
      },
      {
        title: "그림데이터(json) 교환을 위한 웹소켓 서버 구축",
        description:
          "Spring Boot STOMP를 활용해 강사가 그리는 그림데이터를 실시간으로 학생에게 전송하는 웹소켓 서버를 구축했습니다.",
      },
      {
        title: "강사/학생 그림 정확도 체크(색상, 엣지, 구조)모델 개발",
        description:
          "OpenCV를 기반 cv2.calcHist(색상), Canny 알고리즘(엣지), SSIM 알고리즘(구조) 활용해 정확도 체크 모델을 개발했습니다.",
      },
      {
        title: "실시간 방인원 및 실시간 그림 이미지 저장을 위한 redis 연결",
        description:
          "Redis를 활용해 실시간으로 방인원 수를 집계하고 중간 입장 시 강사가 그린 그림 데이터를 빠르게 불러올 수 있도록 구현했습니다.",
      },
    ],
    troubleshooting: [
      {
        title: "라이브 방 인원수 불일치",
        problem:
          "Nginx로 백엔드 2대를 로드밸런싱하는 환경에서 라이브 방 입장 시 집계되는 인원수가 유저마다 다르게 표시되는 문제가 발생했습니다.",
        cause:
          "redisTemplate로 인원수를 조회 후 애플리케이션에서 증가 연산 후 저장하는 비원자적 방식이라 두 인스턴스가 동시에 요청을 처리하면 동일한 인원수를 읽어와 덮어쓰기가 되었습니다.",
        solution:
          "redisTemplate 기반 로직을 Redisson의 AtomicLong으로 변경하고 Redis의 원자적 증가 연산(INCR)을 사용해 동시 요청 100회 기준 누락 32건에서 0건으로 줄였습니다.",
        beforeCode: `// Before: redisTemplate 방식
public void joinRoom(String roomId) {
  String key = "room:count:" + roomId
  String count = (String) redisTemplate.opsForValue().get(key); // Redis에 직접 조호 요청
  int newCount = Integer.parseInt(count) + 1; // 백엔드 서버에서 증가 연산
  redisTemplate.opsForValue().set(key, String.valueOf(newCount)); // Redis에 다시 저장
}
`,
        afterCode: `// After: Redisson AtomicLong 방식
public void joinRoom(String roomId) {
  RAtomicLong roomCount = redissonClient.getAtomicLong("room:count:" + roomId);
  roomCount.incrementAndGet(); // Redis INCR 명령어 사용
}
`,
        tags: ["Concurrency", "Atomic Operations"],
        beforeLanguage: "java",
        afterLanguage: "java",
      },
      {
        title: "실시간 그림 데이터 동기화 지연 및 UI 깨짐",
        problem:
          "그림 데이터를 주고받는 횟수가 늘어날수록 전송량이 누적되어 지연이 발생했고 결국 마우스 드로잉이 끊기며 화면이 느려지는 문제가 발생했습니다.",
        cause:
          "Excalidraw 구조 상 전체 캔버스 데이터를 전송해 획이 늘어나는 만큼 요청량이 증가하게 되었고 이로 인해 네트워크 부하가 증가했습니다.",
        solution:
          "전체 데이터 전송을 단일 획 단위 전송으로 변경하고 id/type 기반 동기화 로직을 적용해 10획만 넘어가도 발생하던 지연 현상을 1,000획 이상에서도 발생하지 않도록 개선했습니다.",
        beforeCode: `// Before: 전체 캔버스 데이터
Sending Excalidraw Data: {
  "type": "excalidraw",
  "boardType": "roomCreator",
  "elements": [
    {
      "id": 1,
      "type": "draw",
      ···
    },
    ···
  ],
  "appState": {
    "showWelcomeScreen": true,
    ···
  }
}
`,
        afterCode: `// After: 단일 획 데이터
Sending Excalidraw Data: {
  "id": 1, // 획 순서
  "type": "draw", // 획 타입(draw/erase/update)
  ···
}
`,
        tags: ["Data Synchronization", "Performance Optimization"],
        beforeLanguage: "json",
        afterLanguage: "json",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectsData.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map((p) => p.slug);
}
