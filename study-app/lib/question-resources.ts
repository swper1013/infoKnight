import type { QuestionResource, StudyQuestion, StudyLink } from "@/lib/types";

const oracleSqlLinks: StudyLink[] = [
  { label: "Oracle SQL Aggregate Functions", url: "https://docs.oracle.com/html/E10592_02/functions003.htm" },
  { label: "Oracle SQL SELECT Basics", url: "https://www.oracletutorial.com/oracle-basics/oracle-select/" },
];

const oracleJavaLinks: StudyLink[] = [
  { label: "Oracle Java Classes and Objects", url: "https://docs.oracle.com/javase//tutorial/java/javaOO" },
  { label: "Oracle Java Exceptions", url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/catch.html" },
];

const conceptLinks: StudyLink[] = [
  { label: "Atlassian Agile Ceremonies", url: "https://www.atlassian.com/agile/scrum/ceremonies" },
  { label: "Red Hat CI/CD Guide", url: "https://www.redhat.com/en/topics/devops/what-is-ci-cd" },
];

export function getQuestionResource(question: StudyQuestion): QuestionResource {
  const key = `${question.type}:${question.topic}`;

  switch (key) {
    case "sql:DISTINCT와 COUNT":
      return {
        conceptSummary:
          "COUNT는 행 수를 세고, COUNT(DISTINCT 컬럼)은 중복을 제거한 값의 종류 수를 센다. 집계 함수와 DISTINCT 조합은 SQL 기본기에서 자주 등장한다.",
        links: oracleSqlLinks,
      };
    case "sql:트랜잭션 제어":
    case "sql:COMMIT":
      return {
        conceptSummary:
          "트랜잭션은 논리적으로 하나의 작업 단위다. COMMIT은 확정, ROLLBACK은 취소, SAVEPOINT는 중간 복구 지점을 만든다.",
        links: [
          { label: "Oracle SAVEPOINT", url: "https://www.oracletutorial.com/oracle-transaction/savepoint/" },
          { label: "Oracle COMMIT", url: "https://www.oracletutorial.com/oracle-transaction/commit/" },
        ],
      };
    case "sql:INDEX":
      return {
        conceptSummary:
          "인덱스는 조회 성능을 높이는 자료구조다. 다만 쓰기 성능과 저장 공간 비용이 늘 수 있어서 필요한 컬럼에만 선택적으로 만든다.",
        links: [
          { label: "Oracle CREATE INDEX", url: "https://www.oracletutorial.com/oracle-index/oracle-create-index/" },
          { label: "Oracle SQL Index Overview", url: "https://docs.oracle.com/en/database/oracle/oracle-database/23/spatl/create-index.html" },
        ],
      };
    case "sql:VIEW":
      return {
        conceptSummary:
          "뷰는 SELECT 결과를 가상 테이블처럼 재사용하게 해준다. 보안, 단순화, 재사용성 측면에서 자주 활용된다.",
        links: [
          { label: "Oracle CREATE VIEW", url: "https://www.oracletutorial.com/oracle-view/oracle-create-view/" },
          { label: "Oracle Views Guide", url: "https://www.oracletutorial.com/oracle-view/" },
        ],
      };
    case "sql:프로시저":
      return {
        conceptSummary:
          "프로시저는 여러 SQL 문을 하나의 단위로 묶어 재사용하는 절차형 객체다. 입력과 출력 파라미터를 함께 다루는 문제가 자주 나온다.",
        links: [
          { label: "Oracle Procedure Basics", url: "https://www.oracletutorial.com/plsql-tutorial/oracle-create-procedure/" },
          { label: "Oracle SELECT INTO", url: "https://www.oracletutorial.com/plsql-tutorial/plsql-select-into/" },
        ],
      };
    case "java:오버라이딩과 static":
      return {
        conceptSummary:
          "인스턴스 메서드는 오버라이딩되지만 static 메서드는 숨김(hiding) 대상이다. 시험에서는 이 둘을 일부러 섞어 착각을 유도하는 문제가 많다.",
        links: [
          { label: "Oracle Overriding and Hiding Methods", url: "https://docs.oracle.com/javase/tutorial/java/IandI/override.html" },
          { label: "Oracle Classes and Objects", url: "https://docs.oracle.com/javase//tutorial/java/javaOO" },
        ],
      };
    case "java:람다식":
      return {
        conceptSummary:
          "람다식은 함수형 인터페이스를 더 간결하게 구현하기 위한 문법이다. 메서드가 하나인 인터페이스라는 점을 먼저 떠올리면 이해가 쉽다.",
        links: [
          { label: "Oracle Lambda Expressions", url: "https://www.oracle.com/technical-resources/articles/java/lambda.html" },
          { label: "Oracle Java Classes and Objects", url: "https://docs.oracle.com/javase//tutorial/java/javaOO" },
        ],
      };
    case "java:인터페이스":
    case "java:default 메서드":
      return {
        conceptSummary:
          "인터페이스는 구현보다 규약을 먼저 잡게 도와준다. default 메서드는 기존 구현체를 깨지 않으면서 기본 동작을 추가하기 위한 장치다.",
        links: [
          { label: "Oracle Interfaces and Inheritance", url: "https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html" },
          { label: "Oracle Default Methods", url: "https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html" },
        ],
      };
    case "java:예외 처리 순서":
    case "java:예외 종류":
      return {
        conceptSummary:
          "예외는 구체적인 하위 예외부터 상위 예외 순으로 처리해야 한다. 그렇지 않으면 뒤의 catch 블록이 도달 불가능해진다.",
        links: oracleJavaLinks,
      };
    case "descriptive:응집도와 결합도":
      return {
        conceptSummary:
          "좋은 설계는 모듈 내부 책임은 밀접하고, 모듈 간 의존성은 약해야 한다. 그래서 응집도는 높게, 결합도는 낮게 가는 방향이 기본 원칙이다.",
        links: [
          { label: "IBM Coupling and Cohesion Overview", url: "https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/design-rhapsody/10.0.2?topic=guidelines-coupling-cohesion" },
          { label: "GeeksforGeeks Coupling and Cohesion", url: "https://www.geeksforgeeks.org/software-engineering-coupling-and-cohesion/" },
        ],
      };
    case "descriptive:테스트 기법":
    case "descriptive:동등 분할":
    case "concept:테스트 기법":
    case "concept:회귀 테스트":
      return {
        conceptSummary:
          "테스트 설계에서는 입력 범위를 나눠 대표값을 고르는 동등 분할과 경계 근처를 집중 확인하는 경계값 분석이 기본이다. 변경 후 기존 기능 확인은 회귀 테스트다.",
        links: [
          { label: "BrowserStack Test Case Design Techniques", url: "https://www.browserstack.com/guide/test-case-design-techniques-in-software-testing" },
          { label: "Atlassian Software Testing Guide", url: "https://www.atlassian.com/continuous-delivery/software-testing/types-of-software-testing" },
        ],
      };
    case "descriptive:네트워크":
    case "concept:OSI 7계층":
      return {
        conceptSummary:
          "네트워크 계층은 IP와 라우팅을 담당하고, 브로드캐스트 주소는 동일 네트워크의 모든 호스트에 메시지를 보내기 위한 주소다.",
        links: [
          { label: "Cloudflare OSI Model", url: "https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/" },
          { label: "Cisco Network Fundamentals", url: "https://www.cisco.com/c/en/us/products/switches/what-is-a-network-switch.html" },
        ],
      };
    case "descriptive:DevOps / CI-CD":
    case "concept:애자일":
      return {
        conceptSummary:
          "CI는 자주 통합하고 자동 검증하는 흐름이고, CD는 검증된 결과물을 배포 직전 또는 운영까지 이어가는 흐름이다. 스프린트 회고는 이런 지속 개선 문화의 한 요소다.",
        links: [
          { label: "Red Hat CI/CD Guide", url: "https://www.redhat.com/en/topics/devops/what-is-ci-cd" },
          { label: "Atlassian Sprint Retrospective", url: "https://www.atlassian.com/agile/scrum/ceremonies" },
        ],
      };
    case "descriptive:REST":
    case "concept:HTTP 무상태성":
      return {
        conceptSummary:
          "REST는 자원을 URI로 표현하고, 요청마다 필요한 정보를 모두 담아 보내는 무상태성 원칙을 중시한다. 그래서 서버 확장성과 단순성이 높아진다.",
        links: [
          { label: "MDN HTTP Overview", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" },
          { label: "Kapresoft REST Stateless", url: "https://www.kapresoft.com/software/2023/05/11/is-rest-api-stateless.html" },
        ],
      };
    case "descriptive:대칭키와 비대칭키":
    case "concept:보안":
    case "concept:해시":
      return {
        conceptSummary:
          "대칭키는 빠르지만 키 공유가 어렵고, 비대칭키는 키 배포에 유리하지만 연산 비용이 크다. 해시는 무결성 확인에 쓰이는 일방향 함수다.",
        links: [
          { label: "OWASP Cryptographic Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html" },
          { label: "OWASP Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" },
        ],
      };
    case "concept:세마포어":
      return {
        conceptSummary:
          "세마포어는 공유 자원 접근 수를 조절해 동기화를 돕는 도구다. 바이너리 세마포어와 카운팅 세마포어를 구분해 두면 문제 풀이가 쉬워진다.",
        links: [
          { label: "GeeksforGeeks Semaphore in OS", url: "https://www.geeksforgeeks.org/semaphores-in-process-synchronization/" },
          { label: "IBM Thread Synchronization Concepts", url: "https://www.ibm.com/docs/en/zos/3.1.0?topic=concepts-semaphores" },
        ],
      };
    default:
      return fallbackResource(question);
  }
}

function fallbackResource(question: StudyQuestion): QuestionResource {
  switch (question.type) {
    case "sql":
      return {
        conceptSummary:
          "SQL 문제는 SELECT, JOIN, GROUP BY, DML, 트랜잭션 제어 중 어느 범주인지 먼저 구분하면 접근이 쉬워진다. 정답만 외우기보다 왜 그 절을 쓰는지 이해하는 편이 실전에 강하다.",
        links: oracleSqlLinks,
      };
    case "java":
      return {
        conceptSummary:
          "Java 문제는 객체지향 문법, 예외 처리, 컬렉션, 기본형 변환 중 어디를 묻는지 먼저 나누면 정리가 쉽다. 코드를 읽을 때는 객체 타입과 실제 호출 메서드를 같이 보자.",
        links: oracleJavaLinks,
      };
    default:
      return {
        conceptSummary:
          "개념 문제는 용어 정의를 한두 문장으로 말할 수 있게 정리해 두는 것이 중요하다. 정의, 목적, 비교 포인트를 함께 묶어 암기하면 기억이 오래간다.",
        links: conceptLinks,
      };
  }
}
