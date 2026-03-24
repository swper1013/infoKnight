import type {
  QuestionResource,
  StudyComparisonRow,
  StudyLink,
  StudyNote,
  StudyQuestion,
} from "@/lib/types";

const oracleSqlLinks: StudyLink[] = [
  { label: "Oracle SQL Aggregate Functions", url: "https://docs.oracle.com/html/E10592_02/functions003.htm" },
  { label: "Oracle SQL SELECT Basics", url: "https://www.oracletutorial.com/oracle-basics/oracle-select/" },
];

const oracleJavaLinks: StudyLink[] = [
  { label: "Oracle Java Classes and Objects", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/" },
  { label: "Oracle Java Exceptions", url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/catch.html" },
];

const pythonLinks: StudyLink[] = [
  { label: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/" },
  { label: "Python Data Structures", url: "https://docs.python.org/3/tutorial/datastructures.html" },
];

const cLinks: StudyLink[] = [
  { label: "C Pointer Basics", url: "https://www.geeksforgeeks.org/c/pointers-in-c-and-c-set-1-introduction-arithmetic-and-array/" },
  { label: "C Structures", url: "https://www.geeksforgeeks.org/c/structures-c/" },
];

const conceptLinks: StudyLink[] = [
  { label: "Atlassian Agile Ceremonies", url: "https://www.atlassian.com/agile/scrum/ceremonies" },
  { label: "Red Hat CI/CD Guide", url: "https://www.redhat.com/en/topics/devops/what-is-ci-cd" },
];

type NoteDefaults = {
  exampleBody: string;
  comparisonRows: StudyComparisonRow[];
};

function createNote(note: StudyNote, defaults: NoteDefaults): StudyNote {
  return {
    ...note,
    exampleTitle: note.exampleTitle ?? "짧은 예시",
    exampleBody: note.exampleBody ?? defaults.exampleBody,
    comparisonTitle: note.comparisonTitle ?? "헷갈리는 비교",
    comparisonRows: note.comparisonRows ?? defaults.comparisonRows,
  };
}

function sqlNote(
  title: string,
  subtitle: string,
  summary: string,
  bullets: string[],
  examTip: string,
): StudyNote {
  return createNote(
    {
      title,
      subtitle,
      summary,
      bullets,
      examTip,
    },
    {
      exampleBody:
        "예: 집계 결과가 3개 이상인 부서를 찾는다면 GROUP BY로 부서를 묶고, COUNT 결과 조건은 WHERE가 아니라 HAVING에 둡니다.",
      comparisonRows: [
        {
          left: "WHERE",
          right: "HAVING",
          point: "원본 행 조건인지, 집계 결과 조건인지로 구분합니다.",
        },
        {
          left: "COMMIT",
          right: "ROLLBACK",
          point: "변경 확정인지 취소인지로 기억하면 됩니다.",
        },
      ],
    },
  );
}

function javaNote(
  title: string,
  subtitle: string,
  summary: string,
  bullets: string[],
  examTip: string,
): StudyNote {
  return createNote(
    {
      title,
      subtitle,
      summary,
      bullets,
      examTip,
    },
    {
      exampleBody:
        "예: Parent obj = new Child()에서 obj.method()를 호출하면 인스턴스 메서드는 Child 쪽 오버라이딩 메서드가 실행됩니다.",
      comparisonRows: [
        {
          left: "오버라이딩",
          right: "static hiding",
          point: "인스턴스 메서드 재정의인지, 클래스 메서드 숨김인지가 다릅니다.",
        },
        {
          left: "checked exception",
          right: "unchecked exception",
          point: "컴파일 단계 처리 강제 여부로 구분합니다.",
        },
      ],
    },
  );
}

function conceptNote(
  title: string,
  subtitle: string,
  summary: string,
  bullets: string[],
  examTip: string,
): StudyNote {
  return createNote(
    {
      title,
      subtitle,
      summary,
      bullets,
      examTip,
    },
    {
      exampleBody:
        "예: 회귀 테스트는 기능 수정 후 기존 로그인이나 조회 기능이 여전히 정상인지 다시 확인하는 상황에 해당합니다.",
      comparisonRows: [
        {
          left: "정의",
          right: "목적",
          point: "무엇인지와 왜 쓰는지를 분리해 두면 서술형에 강합니다.",
        },
        {
          left: "동등 분할",
          right: "경계값 분석",
          point: "대표 구간을 고르는지, 경계 근처를 집중 확인하는지 차이를 기억합니다.",
        },
      ],
    },
  );
}

export function getQuestionResource(question: StudyQuestion): QuestionResource {
  const key = `${question.type}:${question.topic}`;

  switch (key) {
    case "sql:DISTINCT와 COUNT":
      return {
        conceptSummary:
          "COUNT는 행 수를 세고, COUNT(DISTINCT 컬럼)은 중복을 제거한 값의 종류 수를 센다. 집계 함수와 DISTINCT 조합은 SQL 기본기에서 자주 등장한다.",
        studyNote: sqlNote(
          "DISTINCT / COUNT 요점 노트",
          "집계 함수 / 중복 제거 / 실행 결과 해석",
          "이 유형은 식을 외우기보다 COUNT가 무엇을 세는지 먼저 분리해서 보면 쉽게 풀립니다. COUNT(*)는 행 수, COUNT(컬럼)은 NULL을 제외한 값 수, COUNT(DISTINCT 컬럼)은 중복 제거 후 값 종류 수를 셉니다.",
          [
            "문장을 읽을 때 먼저 '행 수를 묻는가, 값 종류 수를 묻는가'를 구분하세요. 이 기준만 잡혀도 COUNT와 COUNT(DISTINCT)를 헷갈릴 일이 줄어듭니다.",
            "집계 함수 문제에서 NULL 포함 여부는 자주 함정으로 나옵니다. COUNT(컬럼)은 NULL을 세지 않는다는 점을 항상 같이 떠올려야 합니다.",
            "결과 표를 직접 그려 보고 중복 제거 후 남는 값이 몇 개인지 세는 습관을 들이면 실전에서 계산 실수가 줄어듭니다.",
          ],
          "SELECT 문을 바로 읽지 말고 '대상 행', '중복 제거 여부', 'NULL 포함 여부' 세 가지만 먼저 체크하세요.",
        ),
        links: oracleSqlLinks,
      };
    case "sql:트랜잭션 제어":
    case "sql:COMMIT":
      return {
        conceptSummary:
          "트랜잭션은 논리적으로 하나의 작업 단위다. COMMIT은 확정, ROLLBACK은 취소, SAVEPOINT는 중간 복구 지점을 만든다.",
        studyNote: sqlNote(
          "트랜잭션 제어 노트",
          "COMMIT / ROLLBACK / SAVEPOINT",
          "트랜잭션 문제는 실제로 작업을 어디까지 확정했는지를 묻습니다. 그래서 SQL 문장을 순서대로 읽으면서 중간 저장점이 있는지, 마지막에 확정했는지부터 보는 것이 핵심입니다.",
          [
            "COMMIT은 지금까지의 변경을 데이터베이스에 확정합니다. COMMIT 이후에는 일반적인 ROLLBACK으로 이전 상태를 되돌릴 수 없습니다.",
            "ROLLBACK은 마지막 COMMIT 이후의 작업을 취소합니다. SAVEPOINT가 있으면 특정 지점까지만 부분 복구가 가능합니다.",
            "시험에서는 INSERT, UPDATE, DELETE 뒤에 SAVEPOINT와 ROLLBACK TO SAVEPOINT를 섞어 두고 최종 결과를 묻는 문제가 자주 나옵니다.",
          ],
          "순서를 표처럼 적으면서 '지금 상태가 확정인지 임시인지'만 표시해도 정답에 훨씬 빨리 도달합니다.",
        ),
        links: [
          { label: "Oracle SAVEPOINT", url: "https://www.oracletutorial.com/oracle-transaction/savepoint/" },
          { label: "Oracle COMMIT", url: "https://www.oracletutorial.com/oracle-transaction/commit/" },
        ],
      };
    case "sql:INDEX":
      return {
        conceptSummary:
          "인덱스는 조회 성능을 높이는 자료구조다. 다만 쓰기 성능과 저장 공간 비용이 늘 수 있어서 필요한 컬럼에만 선택적으로 만든다.",
        studyNote: sqlNote(
          "인덱스 요점 노트",
          "조회 성능 / 쓰기 비용 / 선택 기준",
          "인덱스는 무조건 좋은 기능이 아니라 조회를 빠르게 하는 대신 삽입과 수정, 삭제 비용을 올리는 구조입니다. 그래서 어떤 컬럼에 쓰는지가 더 중요합니다.",
          [
            "검색 조건과 조인 조건에 자주 쓰이는 컬럼은 인덱스 후보가 되기 쉽습니다. 반대로 값 변화가 잦은 컬럼은 관리 비용이 커질 수 있습니다.",
            "인덱스가 있으면 WHERE 조건 검색은 빨라질 수 있지만, INSERT나 UPDATE 때는 인덱스도 같이 갱신해야 해서 성능 부담이 생깁니다.",
            "실기에서는 '조회 성능 향상'과 '저장 공간 및 갱신 비용 증가'를 한 세트로 기억해 두면 대부분의 보기형 문제를 처리할 수 있습니다.",
          ],
          "장점만 외우지 말고 항상 '쓰기 비용 증가'를 같이 붙여 기억하세요.",
        ),
        links: [
          { label: "Oracle CREATE INDEX", url: "https://www.oracletutorial.com/oracle-index/oracle-create-index/" },
          { label: "Oracle SQL Index Overview", url: "https://docs.oracle.com/en/database/oracle/oracle-database/23/spatl/create-index.html" },
        ],
      };
    case "sql:VIEW":
      return {
        conceptSummary:
          "뷰는 SELECT 결과를 가상 테이블처럼 재사용하게 해준다. 보안, 단순화, 재사용성 측면에서 자주 활용된다.",
        studyNote: sqlNote(
          "뷰 요점 노트",
          "가상 테이블 / 재사용 / 보안",
          "뷰는 실제 데이터를 별도로 저장하는 테이블이 아니라 SELECT 결과를 논리적으로 보여 주는 가상 테이블입니다. 복잡한 조회를 단순하게 만들거나 접근 범위를 제한할 때 많이 씁니다.",
          [
            "복잡한 JOIN이나 조건식을 반복해서 써야 할 때 뷰로 감싸 두면 조회 문장이 간결해집니다.",
            "사용자에게 모든 컬럼을 직접 노출하지 않고 필요한 열만 보여 주는 방식으로 보안과 접근 제어에 활용할 수 있습니다.",
            "실기에서는 '독립 저장소'처럼 오해하게 만드는 보기가 나올 수 있으니, 뷰는 기본적으로 SELECT 결과를 재사용하는 논리 객체라는 점을 잡아두면 좋습니다.",
          ],
          "뷰를 보면 먼저 '실데이터 저장소인가, 조회 정의인가'를 구분하세요. 정답 대부분이 여기서 갈립니다.",
        ),
        links: [
          { label: "Oracle CREATE VIEW", url: "https://www.oracletutorial.com/oracle-view/oracle-create-view/" },
          { label: "Oracle Views Guide", url: "https://www.oracletutorial.com/oracle-view/" },
        ],
      };
    case "sql:프로시저":
      return {
        conceptSummary:
          "프로시저는 여러 SQL 문을 하나의 단위로 묶어 재사용하는 절차형 객체다. 입력과 출력 파라미터를 함께 다루는 문제가 자주 나온다.",
        studyNote: sqlNote(
          "프로시저 요점 노트",
          "절차형 객체 / 파라미터 / 재사용",
          "프로시저는 여러 SQL 처리 과정을 하나의 이름으로 묶어 호출할 수 있게 만든 데이터베이스 객체입니다. 실기에서는 입력값을 받아 처리하고 출력값을 돌려주는 흐름을 이해하면 문제를 풀기 쉽습니다.",
          [
            "입력 파라미터는 외부에서 값을 받아 처리 로직에 넘기고, 출력 파라미터는 처리 결과를 바깥으로 전달하는 데 사용합니다.",
            "반복되는 업무 SQL을 하나로 묶으면 재사용성과 유지보수성이 좋아집니다. 이 점이 프로시저의 대표 장점입니다.",
            "문제에서는 SELECT INTO, 변수 대입, 조건 처리, OUT 파라미터 반환 같은 흐름을 순서대로 읽는 훈련이 중요합니다.",
          ],
          "프로시저 문제는 '입력값 받기 → 내부 처리 → 결과 반환' 3단계로 쪼개서 읽으세요.",
        ),
        links: [
          { label: "Oracle Procedure Basics", url: "https://www.oracletutorial.com/plsql-tutorial/oracle-create-procedure/" },
          { label: "Oracle SELECT INTO", url: "https://www.oracletutorial.com/plsql-tutorial/plsql-select-into/" },
        ],
      };
    case "java:오버라이딩과 static":
      return {
        conceptSummary:
          "인스턴스 메서드는 오버라이딩되지만 static 메서드는 숨김(hiding) 대상이다. 시험에서는 이 둘을 일부러 섞어 착각을 유도하는 문제가 많다.",
        studyNote: javaNote(
          "오버라이딩 / static 노트",
          "다형성 / 실제 객체 / hiding",
          "Java 코드 문제는 참조 변수 타입보다 실제 생성된 객체 타입이 더 중요할 때가 많습니다. 특히 인스턴스 메서드는 오버라이딩 규칙을 따르지만 static은 클래스 기준으로 결정된다는 점이 핵심입니다.",
          [
            "Parent obj = new Child() 형태에서는 인스턴스 메서드 호출 시 Child에서 재정의한 메서드가 실행됩니다. 이것이 다형성의 기본입니다.",
            "static 메서드는 객체마다 재정의되는 개념이 아니라 클래스에 속합니다. 그래서 오버라이딩이 아니라 hiding으로 이해해야 맞습니다.",
            "시험에서는 같은 이름의 인스턴스 메서드와 static 메서드를 일부러 섞어 두고 출력 결과를 묻는 경우가 많으니, 메서드 선언부에 static이 있는지 먼저 확인하세요.",
          ],
          "코드를 읽기 전에 메서드가 인스턴스인지 static인지 표시하고 시작하면 실수가 크게 줄어듭니다.",
        ),
        links: [
          { label: "Oracle Overriding and Hiding Methods", url: "https://docs.oracle.com/javase/tutorial/java/IandI/override.html" },
          { label: "Oracle Classes and Objects", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/" },
        ],
      };
    case "java:람다식":
      return {
        conceptSummary:
          "람다식은 함수형 인터페이스를 더 간결하게 구현하기 위한 문법이다. 메서드가 하나인 인터페이스라는 점을 먼저 떠올리면 이해가 쉽다.",
        studyNote: javaNote(
          "람다식 요점 노트",
          "함수형 인터페이스 / 간결한 구현 / 문법 해석",
          "람다식은 익명 객체보다 더 간단하게 동작을 전달하기 위한 문법입니다. 실기에서는 복잡한 문법보다 '메서드가 하나인 인터페이스를 간결하게 구현한다'는 구조를 이해하면 충분합니다.",
          [
            "함수형 인터페이스는 추상 메서드가 하나인 인터페이스입니다. 람다는 바로 이 하나의 메서드를 구현하는 방식이라고 보면 됩니다.",
            "매개변수 목록, 화살표, 실행 코드 블록의 순서로 읽으면 문장이 훨씬 단순해집니다.",
            "문제에서 메서드 참조나 스트림과 함께 나오더라도 핵심은 결국 '어떤 동작을 짧게 넘기고 있는가'를 파악하는 것입니다.",
          ],
          "람다식을 보면 먼저 인터페이스의 추상 메서드가 무엇인지부터 찾으세요.",
        ),
        links: [
          { label: "Oracle Lambda Expressions", url: "https://www.oracle.com/technical-resources/articles/java/lambda.html" },
          { label: "Oracle Java Classes and Objects", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/" },
        ],
      };
    case "java:인터페이스":
    case "java:default 메서드":
      return {
        conceptSummary:
          "인터페이스는 구현보다 규약을 먼저 잡게 도와준다. default 메서드는 기존 구현체를 깨지 않으면서 기본 동작을 추가하기 위한 장치다.",
        studyNote: javaNote(
          "인터페이스 요점 노트",
          "규약 / 구현 분리 / default 메서드",
          "인터페이스는 클래스가 어떤 기능을 제공해야 하는지 약속하는 틀입니다. 실기에서는 추상화와 다형성, 그리고 default 메서드의 목적을 이해하고 있으면 대부분 해결됩니다.",
          [
            "인터페이스는 공통 기능의 규약을 정의합니다. 구현은 클래스가 맡기 때문에 구현체를 바꿔도 사용하는 쪽 코드는 덜 흔들립니다.",
            "default 메서드는 기존 인터페이스에 기능을 추가할 때 구현 클래스들을 모두 깨뜨리지 않으려는 목적에서 등장했습니다.",
            "코드 문제에서는 implements 관계, 같은 이름 메서드 충돌, 다중 인터페이스 상속 상황을 차분히 읽는 것이 중요합니다.",
          ],
          "인터페이스 문제는 '규약인지 구현인지'만 먼저 나눠도 해석이 쉬워집니다.",
        ),
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
        studyNote: javaNote(
          "예외 처리 노트",
          "catch 순서 / 구체 예외 / 컴파일 오류",
          "예외 처리 문제는 어느 catch가 먼저 잡히는지를 이해하면 바로 풀립니다. 더 넓은 예외를 앞에 두면 뒤의 세부 예외 catch가 실행될 기회를 잃기 때문에 코드 자체가 잘못됩니다.",
          [
            "catch 블록은 하위 예외에서 상위 예외 순으로 배치해야 합니다. 예를 들어 Exception을 먼저 두면 대부분의 예외가 거기서 끝나 버립니다.",
            "checked exception은 컴파일 단계에서 처리 강제가 있고, unchecked exception은 런타임 중심으로 다뤄집니다. 둘의 성격도 함께 정리해 두면 좋습니다.",
            "실기에서는 예외 발생 지점, finally 실행 여부, return과 함께 썼을 때의 흐름을 묻는 문제도 자주 나옵니다.",
          ],
          "예외 문제를 풀 때는 try에서 어디서 끊기는지 줄 번호처럼 적어 보세요.",
        ),
        links: oracleJavaLinks,
      };
    case "descriptive:응집도와 결합도":
      return {
        conceptSummary:
          "좋은 설계는 모듈 내부 책임은 밀접하고, 모듈 간 의존성은 약해야 한다. 그래서 응집도는 높게, 결합도는 낮게 가는 방향이 기본 원칙이다.",
        studyNote: conceptNote(
          "응집도 / 결합도 노트",
          "모듈 설계 / 유지보수 / 의존성",
          "서술형에서는 정의를 길게 쓰기보다 방향성을 분명하게 쓰는 것이 중요합니다. 응집도는 높게, 결합도는 낮게라는 문장을 중심으로 이유를 붙이면 안정적으로 점수를 챙길 수 있습니다.",
          [
            "응집도는 모듈 내부 요소들이 얼마나 하나의 목적에 밀접하게 모여 있는지를 뜻합니다. 높을수록 역할이 선명하고 이해하기 쉽습니다.",
            "결합도는 모듈끼리 얼마나 강하게 얽혀 있는지를 뜻합니다. 낮을수록 한쪽 변경이 다른 쪽에 덜 퍼져 유지보수가 쉬워집니다.",
            "서술형 답안은 '응집도는 높게, 결합도는 낮게 설계해야 유지보수성과 재사용성이 좋아진다' 정도로 먼저 적고 보충 설명을 붙이면 좋습니다.",
          ],
          "이 파트는 긴 설명보다 비교 문장 하나를 정확히 쓰는 것이 더 중요합니다.",
        ),
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
        studyNote: conceptNote(
          "테스트 기법 노트",
          "동등 분할 / 경계값 분석 / 회귀 테스트",
          "테스트 문제는 기법 이름과 목적을 연결해서 외우는 것이 핵심입니다. 입력을 나눠 대표값을 고르는지, 경계 근처를 보는지, 변경 후 기존 기능을 확인하는지로 구분하면 정리가 빠릅니다.",
          [
            "동등 분할은 비슷하게 처리될 입력 집합을 같은 그룹으로 묶고 대표값을 고르는 기법입니다. 테스트 케이스 수를 줄이면서도 효율을 확보할 수 있습니다.",
            "경계값 분석은 오류가 자주 발생하는 경계 주변 값에 집중하는 기법입니다. 최소값, 최대값, 직전값, 직후값을 같이 떠올리면 좋습니다.",
            "회귀 테스트는 수정이나 배포 후 기존 기능이 망가지지 않았는지 확인하는 테스트입니다. 변경 이후 확인이라는 목적을 기억하세요.",
          ],
          "기법 이름만 외우지 말고 '언제 쓰는가'를 한 줄씩 붙여 기억하면 시험장에서 훨씬 잘 떠오릅니다.",
        ),
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
        studyNote: conceptNote(
          "네트워크 요점 노트",
          "OSI / IP / 라우팅 / 브로드캐스트",
          "네트워크 파트는 정의를 짧게 끊어 기억하는 것이 좋습니다. 계층별 역할을 완벽히 외우는 것보다 어떤 장비와 어떤 기능이 어느 계층에 가까운지 구분하는 훈련이 더 실전적입니다.",
          [
            "네트워크 계층은 IP 주소를 기반으로 목적지까지 경로를 찾는 라우팅 역할을 담당합니다. 라우터와 연결해 기억하면 좋습니다.",
            "브로드캐스트는 같은 네트워크 범위의 모든 호스트에게 메시지를 보내는 방식입니다. 전체 대상이라는 점이 핵심입니다.",
            "실기에서는 계층 이름, 대표 프로토콜, 대표 장비를 연결한 문제와 간단한 서술형이 자주 나옵니다.",
          ],
          "모르면 전부 외우려 하지 말고 '계층 - 역할 - 예시' 3단어 묶음으로 정리하세요.",
        ),
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
        studyNote: conceptNote(
          "개발 프로세스 노트",
          "애자일 / CI / CD / 회고",
          "개발 프로세스 문제는 용어를 감성적으로 이해하기보다 각 단계가 무엇을 자동화하거나 개선하는지 중심으로 외우는 편이 안전합니다. 짧은 정의 문장을 만들어 두면 서술형에도 바로 쓸 수 있습니다.",
          [
            "CI는 개발자가 자주 코드를 통합하고 자동 빌드와 테스트로 문제를 빠르게 발견하는 흐름입니다. 통합과 검증이 핵심입니다.",
            "CD는 검증된 결과물을 배포 가능한 상태까지 계속 이어가는 흐름입니다. 팀에 따라 배포 직전까지 혹은 실제 운영 반영까지 포함해 설명하기도 합니다.",
            "애자일은 짧은 주기로 협업하고 피드백을 반영하는 방식이며, 스프린트 회고는 지난 작업을 돌아보고 개선점을 찾는 행사입니다.",
          ],
          "이 파트는 도구 이름보다 목적을 먼저 말할 수 있어야 합니다.",
        ),
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
        studyNote: conceptNote(
          "REST / HTTP 노트",
          "자원 표현 / 무상태성 / 요청 구조",
          "REST 문제는 멋진 약어보다 원칙을 묻습니다. URI로 자원을 표현하고, 요청마다 필요한 정보를 담아 보내며, 표준 HTTP 메서드를 사용한다는 흐름만 잡아도 대부분 설명할 수 있습니다.",
          [
            "REST는 자원을 URI로 식별하고, GET POST PUT DELETE 같은 HTTP 메서드로 행위를 표현합니다.",
            "무상태성은 서버가 이전 요청의 상태를 기억하지 않고, 매 요청이 스스로 필요한 정보를 가져야 한다는 뜻입니다.",
            "이 원칙 덕분에 서버 구조가 단순해지고 확장성이 좋아집니다. 실기에서는 장점이나 특징을 서술형으로 묻는 경우가 많습니다.",
          ],
          "REST는 'URI, HTTP 메서드, 무상태성' 세 단어를 한 묶음으로 기억하세요.",
        ),
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
        studyNote: conceptNote(
          "보안 기초 노트",
          "대칭키 / 비대칭키 / 해시",
          "보안 문제는 비슷한 용어를 구분해서 기억하는 것이 중요합니다. 암복호화에 같은 키를 쓰는지, 다른 키를 쓰는지, 아예 복호화가 불가능한지로 나누면 정리가 쉬워집니다.",
          [
            "대칭키 암호화는 암호화와 복호화에 같은 키를 사용합니다. 속도는 빠르지만 안전한 키 공유가 과제가 됩니다.",
            "비대칭키 암호화는 공개키와 개인키처럼 서로 다른 키를 사용합니다. 키 배포에 유리하지만 연산 부담은 더 큽니다.",
            "해시는 원본을 복구하기 위한 암복호화가 아니라 데이터 변경 여부를 확인하는 무결성 검사용 일방향 함수입니다.",
          ],
          "시험에서는 '복호화 가능 여부'를 기준으로 암호화와 해시를 나누면 실수가 줄어듭니다.",
        ),
        links: [
          { label: "OWASP Cryptographic Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html" },
          { label: "OWASP Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" },
        ],
      };
    case "concept:세마포어":
      return {
        conceptSummary:
          "세마포어는 공유 자원 접근 수를 조절해 동기화를 돕는 도구다. 바이너리 세마포어와 카운팅 세마포어를 구분해 두면 문제 풀이가 쉬워진다.",
        studyNote: conceptNote(
          "세마포어 노트",
          "동기화 / 임계 구역 / 자원 접근 제어",
          "운영체제 파트에서는 세마포어를 락처럼만 외우지 말고 '공유 자원에 동시에 몇 개가 들어갈 수 있는지 관리하는 도구'라고 이해하는 편이 훨씬 오래 갑니다.",
          [
            "세마포어는 여러 프로세스나 스레드가 공유 자원에 접근할 때 충돌을 막기 위해 사용합니다. 접근 가능한 개수를 수치로 관리한다는 점이 중요합니다.",
            "바이너리 세마포어는 0과 1 수준으로 접근 허용 여부를 제어하고, 카운팅 세마포어는 여러 개의 자원 개수를 관리할 수 있습니다.",
            "시험에서는 임계 구역, 상호 배제, 동기화 개념과 함께 묶어 출제되는 경우가 많습니다.",
          ],
          "세마포어는 '공유 자원 접근 수 관리'라는 문장으로 먼저 정리해 두세요.",
        ),
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
        studyNote: sqlNote(
          "SQL 기본 노트",
          "절의 역할 / 실행 순서 / 결과 해석",
          "SQL은 문법이 많아 보여도 결국 조회, 집계, 변경, 트랜잭션 중 무엇을 하고 싶은지로 나뉩니다. 문제를 읽을 때 먼저 범주를 정리하면 복잡한 문장도 훨씬 단순하게 보입니다.",
          [
            "JOIN은 테이블 연결, WHERE는 조건 필터, GROUP BY는 그룹화, HAVING은 집계 결과 조건이라는 역할 분리를 먼저 기억하세요.",
            "DML 문제는 실제로 데이터가 어떻게 바뀌는지 표처럼 써 보면서 추적하면 정확도가 올라갑니다.",
            "시험장에서는 SQL 문장을 한 번에 이해하려 하기보다 절 단위로 끊어 읽는 습관이 훨씬 유리합니다.",
          ],
          "모르는 SQL이 나와도 '역할 분리'만 되면 절반은 풀린 것입니다.",
        ),
        links: oracleSqlLinks,
      };
    case "java":
      return {
        conceptSummary:
          "Java 문제는 객체지향 문법, 예외 처리, 컬렉션, 기본형 변환 중 어디를 묻는지 먼저 나누면 정리가 쉽다. 코드를 읽을 때는 객체 타입과 실제 호출 메서드를 같이 보자.",
        studyNote: javaNote(
          "Java 기본 노트",
          "실행 흐름 / 객체 타입 / 예외 / 컬렉션",
          "Java 코드 문제는 문법을 전부 기억하는 시험이 아니라 실행 흐름을 읽는 시험에 가깝습니다. 실제 객체가 무엇인지, 어떤 메서드가 호출되는지, 예외가 어디서 나는지만 정확히 봐도 정답률이 올라갑니다.",
          [
            "상속이 나오면 참조형보다 실제 생성 객체를 먼저 확인하세요. 인스턴스 메서드는 실제 객체 기준으로 동작합니다.",
            "예외가 나오면 try 내부에서 어디서 끊기는지, catch 순서가 맞는지, finally가 실행되는지 확인하세요.",
            "컬렉션이 나오면 순서 유지 여부, 중복 허용 여부, 키-값 구조인지 먼저 분류하면 문제를 빠르게 읽을 수 있습니다.",
          ],
          "코드를 머리로만 읽지 말고 한 줄씩 결과를 적는 습관이 가장 효과적입니다.",
        ),
        links: oracleJavaLinks,
      };
    case "python":
      return {
        conceptSummary:
          "Python 문제는 리스트, 딕셔너리, 슬라이싱, comprehension, lambda/filter처럼 짧은 문법 조합을 정확히 읽는 것이 핵심이다. 출력형 문제는 중간 자료구조를 직접 적어 보면 훨씬 쉬워진다.",
        studyNote: conceptNote(
          "Python 기본 노트",
          "리스트 / 딕셔너리 / comprehension / 함수형 문법",
          "Python은 문법이 짧아서 오히려 한 줄을 잘못 읽기 쉽습니다. 슬라이싱 결과, comprehension의 조건, lambda나 filter가 남기는 값만 정확히 추적해도 대부분의 출력형 문제를 풀 수 있습니다.",
          [
            "리스트 슬라이싱은 시작 인덱스는 포함하고 끝 인덱스는 제외합니다. 이 기본 규칙만 정확해도 초반 실수를 많이 줄일 수 있습니다.",
            "딕셔너리는 키와 값 구조이고, comprehension은 반복과 조건을 한 줄로 압축한 문법입니다. 중간 결과를 직접 적어 보면 훨씬 잘 풀립니다.",
            "lambda, filter, map이 나오면 무엇을 남기고 무엇을 변환하는지부터 분리해서 보세요.",
          ],
          "Python 출력형은 실제 리스트나 dict 결과를 손으로 한 번 써 보는 습관이 가장 효과적입니다.",
        ),
        links: pythonLinks,
      };
    case "c":
      return {
        conceptSummary:
          "C 문제는 포인터, 배열, 구조체, static 변수, 전위/후위 증가 연산, 함수 호출 후 값 변화 추적이 핵심이다. 한 줄씩 메모리 상태를 적어 보면 정답률이 크게 올라간다.",
        studyNote: conceptNote(
          "C 기본 노트",
          "포인터 / 구조체 / static / 증감 연산",
          "C 출력형 문제는 문법을 많이 외우는 시험이 아니라, 변수와 포인터가 어느 주소를 가리키고 값이 언제 바뀌는지 추적하는 시험에 가깝습니다. 구조체와 포인터를 같이 쓰는 문제가 특히 자주 등장합니다.",
          [
            "포인터는 값을 직접 담는 것이 아니라 주소를 담습니다. *는 역참조, &는 주소 연산자라는 점을 먼저 정리하세요.",
            "구조체 문제는 멤버 값이 함수 호출 전후에 어떻게 바뀌는지 순서대로 적어 보면 대부분 풀립니다.",
            "전위와 후위 증가, static 변수 누적은 시험에서 자주 함정으로 쓰이므로 계산 순서를 손으로 써 보는 습관이 중요합니다.",
          ],
          "C 문제는 포인터가 가리키는 대상과 값 변경 시점을 표처럼 적으면 훨씬 안정적으로 맞힐 수 있습니다.",
        ),
        links: cLinks,
      };
    default:
      return {
        conceptSummary:
          "개념 문제는 용어 정의를 한두 문장으로 말할 수 있게 정리해 두는 것이 중요하다. 정의, 목적, 비교 포인트를 함께 묶어 암기하면 기억이 오래간다.",
        studyNote: conceptNote(
          "개념 정리 노트",
          "정의 / 목적 / 비교 포인트",
          "개념형 문제는 깊은 설명보다 짧고 정확한 정의가 먼저입니다. 용어를 보면 정의 한 문장, 왜 필요한지 한 문장, 비슷한 개념과의 차이 한 문장을 붙여 정리하는 습관이 좋습니다.",
          [
            "정의를 먼저 쓰고, 목적이나 장점을 이어서 붙이면 서술형으로도 바로 확장할 수 있습니다.",
            "비슷한 용어와 비교 포인트를 하나 정해 두면 선택형 보기에서도 흔들리지 않습니다.",
            "시험 직전에는 긴 설명보다 압축 문장 위주로 보는 편이 효율적입니다.",
          ],
          "'정의, 목적, 비교' 세 칸으로 기억하면 대부분의 개념 문제가 정리됩니다.",
        ),
        links: conceptLinks,
      };
  }
}
