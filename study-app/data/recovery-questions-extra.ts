import type { StudyQuestion } from "@/lib/types";

const sourceUrlsByYear: Record<number, string[]> = {
  2020: ["https://chobopark.tistory.com/460"],
  2021: [
    "https://chobopark.tistory.com/460",
    "https://roadtofree.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EB%AC%B8%EC%A0%9C-SQL-%EA%B8%B0%EC%B6%9C-%ED%92%80%EC%9D%B4-%EB%AA%A8%EC%9D%8C",
  ],
  2022: [
    "https://ss-o.tistory.com/165",
    "https://techtrail.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-2022%EB%85%84-1%ED%9A%8C-%EA%B8%B0%EC%B6%9C-%EC%BD%94%EB%93%9C-%ED%95%B4%EC%84%A4-C%EC%96%B8%EC%96%B4-Java-Python",
  ],
  2023: [
    "https://sssinga.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-2023%EB%85%84-3%ED%9A%8C-%EA%B8%B0%EC%B6%9C%EB%AC%B8%EC%A0%9C-%EB%B3%B5%EC%9B%90-%EB%B0%8F-%EB%8B%B5%ED%95%B4%EC%84%A4",
    "https://chobopark.tistory.com/460",
  ],
  2024: [
    "https://my-dev-diary.tistory.com/17",
    "https://gogo-coding.tistory.com/356",
  ],
  2025: ["https://www.kimjaahyun.com/ko/blog/jeongcheogi-practical-exam-review-2025-2"],
};

type Row = [number, number];
type NullRow = [number, string];

type RecoveryYearConfig = {
  year: number;
  sqlRound: string;
  javaRound: string;
  pythonRound: string;
  cRound: string;
  sqlCountRows: Row[];
  sqlCountMinNo: number;
  sqlCountMinPoint: number;
  sqlCountSpecialNo: number;
  joinRows: string[][];
  havingRows: Row[];
  havingThreshold: number;
  nullRows: NullRow[];
  javaLoopRange: number;
  javaLoopDivisor: number;
  javaStaticStart: number;
  javaStaticIncrement: number;
  javaStaticInstances: number;
  javaArray: number[];
  javaString: string;
  pythonList: number[];
  pythonSliceStart: number;
  pythonSliceEnd: number;
  pythonAppendValue: number;
  pythonFilterList: number[];
  pythonFilterMin: number;
  pythonDict: Record<string, number>;
  pythonRangeEnd: number;
  cArray: number[];
  cStruct: { a: number; b: number };
  cStaticStart: number;
  cStaticIncrement: number;
  cStaticCalls: number;
  cIncStart: number;
};

const configs: RecoveryYearConfig[] = [
  {
    year: 2020,
    sqlRound: "1회",
    javaRound: "2회",
    pythonRound: "3회",
    cRound: "3회",
    sqlCountRows: [[101, 72], [130, 84], [150, 91], [205, 61]],
    sqlCountMinNo: 120,
    sqlCountMinPoint: 80,
    sqlCountSpecialNo: 205,
    joinRows: [["1001", "10", "10", "컴퓨터공학"], ["1002", "20", "20", "정보통신"]],
    havingRows: [[10, 70], [10, 90], [20, 81], [20, 84]],
    havingThreshold: 80,
    nullRows: [[1, "NULL"], [2, "2026-03-01"], [3, "NULL"]],
    javaLoopRange: 5,
    javaLoopDivisor: 2,
    javaStaticStart: 1,
    javaStaticIncrement: 2,
    javaStaticInstances: 2,
    javaArray: [2, 4, 6],
    javaString: "ABCD",
    pythonList: [1, 2, 3, 4],
    pythonSliceStart: 1,
    pythonSliceEnd: 3,
    pythonAppendValue: 4,
    pythonFilterList: [1, 2, 3, 4, 5],
    pythonFilterMin: 3,
    pythonDict: { x: 3, y: 5 },
    pythonRangeEnd: 4,
    cArray: [1, 3, 5],
    cStruct: { a: 3, b: 5 },
    cStaticStart: 1,
    cStaticIncrement: 1,
    cStaticCalls: 2,
    cIncStart: 3,
  },
  {
    year: 2021,
    sqlRound: "1회",
    javaRound: "2회",
    pythonRound: "3회",
    cRound: "3회",
    sqlCountRows: [[111, 65], [140, 88], [180, 92], [210, 58]],
    sqlCountMinNo: 130,
    sqlCountMinPoint: 80,
    sqlCountSpecialNo: 210,
    joinRows: [["2001", "30", "30", "소프트웨어"], ["2002", "40", "40", "인공지능"]],
    havingRows: [[30, 75], [30, 88], [40, 82], [40, 91]],
    havingThreshold: 82,
    nullRows: [[1, "NULL"], [2, "NULL"], [3, "2026-03-05"]],
    javaLoopRange: 6,
    javaLoopDivisor: 2,
    javaStaticStart: 2,
    javaStaticIncrement: 3,
    javaStaticInstances: 2,
    javaArray: [3, 5, 7],
    javaString: "HELLO",
    pythonList: [2, 4, 6, 8],
    pythonSliceStart: 0,
    pythonSliceEnd: 2,
    pythonAppendValue: 8,
    pythonFilterList: [2, 3, 4, 5, 6],
    pythonFilterMin: 4,
    pythonDict: { x: 4, y: 6 },
    pythonRangeEnd: 5,
    cArray: [2, 4, 6],
    cStruct: { a: 4, b: 6 },
    cStaticStart: 2,
    cStaticIncrement: 2,
    cStaticCalls: 2,
    cIncStart: 4,
  },
  {
    year: 2022,
    sqlRound: "1회",
    javaRound: "2회",
    pythonRound: "3회",
    cRound: "1회",
    sqlCountRows: [[121, 69], [160, 87], [175, 90], [230, 63]],
    sqlCountMinNo: 150,
    sqlCountMinPoint: 85,
    sqlCountSpecialNo: 230,
    joinRows: [["3001", "50", "50", "정보보호"], ["3002", "60", "60", "데이터사이언스"]],
    havingRows: [[50, 78], [50, 88], [60, 85], [60, 95]],
    havingThreshold: 83,
    nullRows: [[1, "2026-03-10"], [2, "NULL"], [3, "NULL"]],
    javaLoopRange: 7,
    javaLoopDivisor: 3,
    javaStaticStart: 1,
    javaStaticIncrement: 4,
    javaStaticInstances: 2,
    javaArray: [4, 6, 8],
    javaString: "JAVA",
    pythonList: [3, 5, 7, 9],
    pythonSliceStart: 1,
    pythonSliceEnd: 3,
    pythonAppendValue: 9,
    pythonFilterList: [1, 3, 5, 7, 9],
    pythonFilterMin: 5,
    pythonDict: { x: 5, y: 7 },
    pythonRangeEnd: 6,
    cArray: [3, 6, 9],
    cStruct: { a: 5, b: 7 },
    cStaticStart: 1,
    cStaticIncrement: 2,
    cStaticCalls: 3,
    cIncStart: 5,
  },
  {
    year: 2023,
    sqlRound: "1회",
    javaRound: "2회",
    pythonRound: "3회",
    cRound: "3회",
    sqlCountRows: [[131, 71], [170, 89], [190, 94], [240, 62]],
    sqlCountMinNo: 160,
    sqlCountMinPoint: 88,
    sqlCountSpecialNo: 240,
    joinRows: [["4001", "70", "70", "클라우드"], ["4002", "80", "80", "빅데이터"]],
    havingRows: [[70, 79], [70, 90], [80, 88], [80, 96]],
    havingThreshold: 84,
    nullRows: [[1, "NULL"], [2, "2026-03-11"], [3, "NULL"]],
    javaLoopRange: 8,
    javaLoopDivisor: 2,
    javaStaticStart: 3,
    javaStaticIncrement: 2,
    javaStaticInstances: 3,
    javaArray: [5, 7, 9],
    javaString: "SPRING",
    pythonList: [4, 6, 8, 10],
    pythonSliceStart: 0,
    pythonSliceEnd: 3,
    pythonAppendValue: 10,
    pythonFilterList: [2, 4, 6, 8, 10],
    pythonFilterMin: 6,
    pythonDict: { x: 6, y: 8 },
    pythonRangeEnd: 7,
    cArray: [4, 8, 12],
    cStruct: { a: 6, b: 8 },
    cStaticStart: 2,
    cStaticIncrement: 3,
    cStaticCalls: 2,
    cIncStart: 6,
  },
  {
    year: 2024,
    sqlRound: "1회",
    javaRound: "2회",
    pythonRound: "3회",
    cRound: "3회",
    sqlCountRows: [[141, 73], [180, 91], [200, 96], [250, 64]],
    sqlCountMinNo: 175,
    sqlCountMinPoint: 90,
    sqlCountSpecialNo: 250,
    joinRows: [["5001", "90", "90", "네트워크"], ["5002", "91", "91", "보안공학"]],
    havingRows: [[90, 80], [90, 92], [91, 89], [91, 97]],
    havingThreshold: 85,
    nullRows: [[1, "NULL"], [2, "NULL"], [3, "2026-03-12"]],
    javaLoopRange: 9,
    javaLoopDivisor: 3,
    javaStaticStart: 2,
    javaStaticIncrement: 5,
    javaStaticInstances: 2,
    javaArray: [6, 8, 10],
    javaString: "OBJECT",
    pythonList: [5, 7, 9, 11],
    pythonSliceStart: 1,
    pythonSliceEnd: 4,
    pythonAppendValue: 11,
    pythonFilterList: [3, 5, 7, 9, 11],
    pythonFilterMin: 7,
    pythonDict: { x: 7, y: 9 },
    pythonRangeEnd: 8,
    cArray: [5, 10, 15],
    cStruct: { a: 7, b: 9 },
    cStaticStart: 1,
    cStaticIncrement: 4,
    cStaticCalls: 2,
    cIncStart: 7,
  },
  {
    year: 2025,
    sqlRound: "1회",
    javaRound: "2회",
    pythonRound: "3회",
    cRound: "2회",
    sqlCountRows: [[151, 74], [190, 93], [210, 98], [260, 66]],
    sqlCountMinNo: 185,
    sqlCountMinPoint: 92,
    sqlCountSpecialNo: 260,
    joinRows: [["6001", "95", "95", "AI융합"], ["6002", "96", "96", "플랫폼공학"]],
    havingRows: [[95, 81], [95, 94], [96, 90], [96, 98]],
    havingThreshold: 86,
    nullRows: [[1, "NULL"], [2, "2026-03-13"], [3, "NULL"]],
    javaLoopRange: 10,
    javaLoopDivisor: 2,
    javaStaticStart: 4,
    javaStaticIncrement: 3,
    javaStaticInstances: 3,
    javaArray: [7, 9, 11],
    javaString: "STATIC",
    pythonList: [6, 8, 10, 12],
    pythonSliceStart: 0,
    pythonSliceEnd: 2,
    pythonAppendValue: 12,
    pythonFilterList: [4, 6, 8, 10, 12],
    pythonFilterMin: 8,
    pythonDict: { x: 8, y: 10 },
    pythonRangeEnd: 9,
    cArray: [6, 12, 18],
    cStruct: { a: 8, b: 10 },
    cStaticStart: 3,
    cStaticIncrement: 2,
    cStaticCalls: 3,
    cIncStart: 8,
  },
];

function formatRoundId(round: string) {
  return round.replace(/[^0-9]/g, "") || "x";
}

function countSqlAnswer(rows: Row[], minNo: number, minPoint: number, specialNo: number) {
  return String(rows.filter(([studentNo, point]) => (studentNo >= minNo && point >= minPoint) || studentNo === specialNo).length);
}

function nullCount(rows: NullRow[]) {
  return String(rows.filter(([, value]) => value === "NULL").length);
}

function avg(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function buildSqlQuestions(config: RecoveryYearConfig): StudyQuestion[] {
  const countAnswer = countSqlAnswer(
    config.sqlCountRows,
    config.sqlCountMinNo,
    config.sqlCountMinPoint,
    config.sqlCountSpecialNo,
  );
  const grouped = config.havingRows.reduce<Record<number, number[]>>((acc, [deptId, score]) => {
    acc[deptId] ??= [];
    acc[deptId].push(score);
    return acc;
  }, {});
  const havingDeptCount = Object.values(grouped).filter((scores) => avg(scores) >= config.havingThreshold).length;
  const nullAnswer = nullCount(config.nullRows);

  return [
    {
      id: `recovery-${config.year}-${formatRoundId(config.sqlRound)}-sql-02`,
      type: "sql",
      topic: "COUNT와 조건 우선순위",
      question:
        `[${config.year} ${config.sqlRound} 복원 경향 변형]\n다음 SQL 결과 행 수를 쓰시오.\n\nSELECT COUNT(*)\nFROM score\nWHERE student_no >= ${config.sqlCountMinNo} AND point >= ${config.sqlCountMinPoint} OR student_no = ${config.sqlCountSpecialNo};`,
      answer: countAnswer,
      explanation:
        `AND가 OR보다 먼저 계산됩니다. 따라서 student_no >= ${config.sqlCountMinNo} 이고 point >= ${config.sqlCountMinPoint} 인 행과 student_no = ${config.sqlCountSpecialNo} 인 행을 합쳐 세면 됩니다.`,
      difficulty: "기본",
      sourceNote: `${config.year} 공개 복원 SQL COUNT/조건 우선순위 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.sqlRound,
      questionTables: [
        {
          title: "score 예시 테이블",
          columns: ["student_no", "point"],
          rows: config.sqlCountRows.map(([studentNo, point]) => [String(studentNo), String(point)]),
          note: "조건식은 AND를 먼저 묶고, 마지막에 OR 조건을 합칩니다.",
        },
      ],
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.sqlRound)}-sql-03`,
      type: "sql",
      topic: "JOIN 기본 문법",
      question:
        `[${config.year} ${config.sqlRound} 복원 경향 변형]\n빈칸에 들어갈 알맞은 SQL 구문을 순서대로 쓰시오.\n\nSELECT a.student_no, b.major_name\nFROM student a JOIN major b ( 1 ) a.major_id = b.( 2 );`,
      answer: "1) ON, 2) major_id",
      explanation:
        "JOIN의 결합 조건은 ON 절에 작성하고, 공통 키 major_id를 연결합니다. 복원 문제에서 빈칸 채우기형으로 자주 보이는 기본 문법입니다.",
      difficulty: "입문",
      sourceNote: `${config.year} 공개 복원 SQL JOIN 문법 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.sqlRound,
      questionTables: [
        {
          title: "student / major 예시 테이블",
          columns: ["student.student_no", "student.major_id", "major.major_id", "major.major_name"],
          rows: config.joinRows,
          note: "공통 키 major_id를 ON 절에서 연결하는 구조입니다.",
        },
      ],
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.sqlRound)}-sql-04`,
      type: "sql",
      topic: "GROUP BY와 HAVING",
      question:
        `[${config.year} ${config.sqlRound} 복원 경향 변형]\n다음 SQL을 실행했을 때 조회되는 부서 수를 쓰시오.\n\nSELECT dept_id\nFROM exam_result\nGROUP BY dept_id\nHAVING AVG(score) >= ${config.havingThreshold};`,
      answer: String(havingDeptCount),
      explanation:
        `GROUP BY로 부서별 집계 후 HAVING에서 평균 ${config.havingThreshold} 이상인 그룹만 남깁니다. 예시 데이터 기준으로 해당하는 부서 수를 세면 됩니다.`,
      difficulty: "기본",
      sourceNote: `${config.year} 공개 복원 SQL GROUP BY/HAVING 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.sqlRound,
      questionTables: [
        {
          title: "exam_result 예시 테이블",
          columns: ["dept_id", "score"],
          rows: config.havingRows.map(([deptId, score]) => [String(deptId), String(score)]),
          note: "AVG(score) 계산 후 조건을 거는 절은 HAVING입니다.",
        },
      ],
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.sqlRound)}-sql-05`,
      type: "sql",
      topic: "IS NULL과 COUNT",
      question:
        `[${config.year} ${config.sqlRound} 복원 경향 변형]\n다음 SQL 결과 행 수를 쓰시오.\n\nSELECT COUNT(*)\nFROM payment\nWHERE cancel_at IS NULL;`,
      answer: nullAnswer,
      explanation:
        "NULL 비교는 = NULL이 아니라 IS NULL을 사용합니다. 예시 테이블에서 cancel_at이 NULL인 행만 세면 됩니다.",
      difficulty: "기본",
      sourceNote: `${config.year} 공개 복원 SQL NULL 조건식 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.sqlRound,
      questionTables: [
        {
          title: "payment 예시 테이블",
          columns: ["payment_no", "cancel_at"],
          rows: config.nullRows.map(([paymentNo, value]) => [String(paymentNo), value]),
          note: "NULL 여부 판단은 IS NULL / IS NOT NULL을 사용합니다.",
        },
      ],
      sourceUrls: sourceUrlsByYear[config.year],
    },
  ];
}

function buildJavaQuestions(config: RecoveryYearConfig): StudyQuestion[] {
  const loopAnswer = String(
    Array.from({ length: config.javaLoopRange }, (_, index) => index + 1)
      .filter((value) => value % config.javaLoopDivisor === 0)
      .reduce((sum, value) => sum + value, 0),
  );
  const staticAnswer = String(config.javaStaticStart + config.javaStaticIncrement * config.javaStaticInstances);
  const arrayAnswer = String(config.javaArray[0] + config.javaArray[2]);
  const stringAnswer = String(config.javaString.length);

  return [
    {
      id: `recovery-${config.year}-${formatRoundId(config.javaRound)}-java-02`,
      type: "java",
      topic: "for문과 조건 누적",
      question:
        `[${config.year} ${config.javaRound} 복원 경향 변형]\n다음 Java 코드의 출력 결과를 쓰시오.\n\npublic class Main {\n  public static void main(String[] args) {\n    int sum = 0;\n    for (int i = 1; i <= ${config.javaLoopRange}; i++) {\n      if (i % ${config.javaLoopDivisor} == 0) sum += i;\n    }\n    System.out.print(sum);\n  }\n}`,
      answer: loopAnswer,
      explanation: `1부터 ${config.javaLoopRange}까지 중 ${config.javaLoopDivisor}의 배수만 더하면 됩니다.`,
      difficulty: "입문",
      sourceNote: `${config.year} 공개 복원 Java 반복문/조건 누적 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.javaRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.javaRound)}-java-03`,
      type: "java",
      topic: "static 변수 누적",
      question:
        `[${config.year} ${config.javaRound} 복원 경향 변형]\n다음 Java 코드의 출력 결과를 쓰시오.\n\nclass Counter {\n  static int value = ${config.javaStaticStart};\n  Counter() { value += ${config.javaStaticIncrement}; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    ${Array.from({ length: config.javaStaticInstances }, () => "new Counter();").join("\n    ")}\n    System.out.print(Counter.value);\n  }\n}`,
      answer: staticAnswer,
      explanation: `초기값 ${config.javaStaticStart}에서 생성자 호출마다 ${config.javaStaticIncrement}씩 증가하므로 최종값은 ${staticAnswer}입니다.`,
      difficulty: "기본",
      sourceNote: `${config.year} 공개 복원 Java static 누적 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.javaRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.javaRound)}-java-04`,
      type: "java",
      topic: "배열 인덱스 계산",
      question:
        `[${config.year} ${config.javaRound} 복원 경향 변형]\n다음 Java 코드의 출력 결과를 쓰시오.\n\npublic class Main {\n  public static void main(String[] args) {\n    int[] arr = {${config.javaArray.join(", ")}};\n    System.out.print(arr[0] + arr[2]);\n  }\n}`,
      answer: arrayAnswer,
      explanation: `배열 첫 번째 값과 세 번째 값을 더하면 ${arrayAnswer}입니다.`,
      difficulty: "입문",
      sourceNote: `${config.year} 공개 복원 Java 배열 인덱스 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.javaRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.javaRound)}-java-05`,
      type: "java",
      topic: "문자열 길이",
      question:
        `[${config.year} ${config.javaRound} 복원 경향 변형]\n다음 Java 코드의 출력 결과를 쓰시오.\n\npublic class Main {\n  public static void main(String[] args) {\n    String s = \"${config.javaString}\";\n    System.out.print(s.length());\n  }\n}`,
      answer: stringAnswer,
      explanation: `문자열 ${config.javaString}의 길이는 ${stringAnswer}입니다.`,
      difficulty: "입문",
      sourceNote: `${config.year} 공개 복원 Java 문자열 메서드 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.javaRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
  ];
}

function buildPythonQuestions(config: RecoveryYearConfig): StudyQuestion[] {
  const sliced = config.pythonList.slice(config.pythonSliceStart, config.pythonSliceEnd);
  const sliceAnswer = String([...sliced, config.pythonAppendValue].reduce((sum, value) => sum + value, 0));
  const filterAnswer = String(config.pythonFilterList.filter((value) => value > config.pythonFilterMin).length);
  const dictAnswer = String(config.pythonDict.x * config.pythonDict.y);
  const rangeAnswer = String(Array.from({ length: config.pythonRangeEnd - 1 }, (_, index) => index + 1).reduce((sum, value) => sum + value, 0));

  return [
    {
      id: `recovery-${config.year}-${formatRoundId(config.pythonRound)}-python-02`,
      type: "python",
      topic: "슬라이싱과 append",
      question:
        `[${config.year} ${config.pythonRound} 복원 경향 변형]\n다음 Python 코드의 출력 결과를 쓰시오.\n\narr = [${config.pythonList.join(", ")}]\npart = arr[${config.pythonSliceStart}:${config.pythonSliceEnd}]\npart.append(${config.pythonAppendValue})\nprint(sum(part))`,
      answer: sliceAnswer,
      explanation: `슬라이싱 결과에 ${config.pythonAppendValue}를 추가한 뒤 합을 구하면 ${sliceAnswer}입니다.`,
      difficulty: "입문",
      sourceNote: `${config.year} 공개 복원 Python 슬라이싱 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.pythonRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.pythonRound)}-python-03`,
      type: "python",
      topic: "리스트 컴프리헨션 필터",
      question:
        `[${config.year} ${config.pythonRound} 복원 경향 변형]\n다음 Python 코드의 출력 결과를 쓰시오.\n\nnums = [${config.pythonFilterList.join(", ")}]\nout = [n for n in nums if n > ${config.pythonFilterMin}]\nprint(len(out))`,
      answer: filterAnswer,
      explanation: `${config.pythonFilterMin}보다 큰 값만 남기면 총 ${filterAnswer}개입니다.`,
      difficulty: "기본",
      sourceNote: `${config.year} 공개 복원 Python comprehension 필터 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.pythonRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.pythonRound)}-python-04`,
      type: "python",
      topic: "딕셔너리 값 접근",
      question:
        `[${config.year} ${config.pythonRound} 복원 경향 변형]\n다음 Python 코드의 출력 결과를 쓰시오.\n\ndata = {'x': ${config.pythonDict.x}, 'y': ${config.pythonDict.y}}\nprint(data['x'] * data['y'])`,
      answer: dictAnswer,
      explanation: `딕셔너리 x와 y 값을 읽어 곱하면 ${dictAnswer}입니다.`,
      difficulty: "입문",
      sourceNote: `${config.year} 공개 복원 Python dict 접근 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.pythonRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.pythonRound)}-python-05`,
      type: "python",
      topic: "range와 누적 합",
      question:
        `[${config.year} ${config.pythonRound} 복원 경향 변형]\n다음 Python 코드의 출력 결과를 쓰시오.\n\nsum_v = 0\nfor i in range(1, ${config.pythonRangeEnd}):\n    sum_v += i\nprint(sum_v)`,
      answer: rangeAnswer,
      explanation: `range(1, ${config.pythonRangeEnd})는 1부터 ${config.pythonRangeEnd - 1}까지 생성하므로 합은 ${rangeAnswer}입니다.`,
      difficulty: "입문",
      sourceNote: `${config.year} 공개 복원 Python range 누적 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.pythonRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
  ];
}

function buildCQuestions(config: RecoveryYearConfig): StudyQuestion[] {
  const cArrayAnswer = String(config.cArray.reduce((sum, value) => sum + value, 0));
  const cStructAnswer = String(config.cStruct.a + config.cStruct.b);
  const cStaticValues = Array.from({ length: config.cStaticCalls }, (_, index) => config.cStaticStart + config.cStaticIncrement * (index + 1));
  const cStaticAnswer = cStaticValues.join(" ");
  const cStaticFormat = Array.from({ length: config.cStaticCalls }, () => "%d").join(" ");
  const cStaticCalls = Array.from({ length: config.cStaticCalls }, () => "func()").join(", ");
  const cIncAnswer = `${config.cIncStart} ${config.cIncStart + 1}`;

  return [
    {
      id: `recovery-${config.year}-${formatRoundId(config.cRound)}-c-02`,
      type: "c",
      topic: "배열과 반복문",
      question:
        `[${config.year} C언어 복원 경향 변형]\n다음 C 코드의 출력 결과를 쓰시오.\n\n#include <stdio.h>\nint main(){\n  int a[3] = {${config.cArray.join(", ")}};\n  int sum = 0;\n  for(int i=0; i<3; i++) sum += a[i];\n  printf(\"%d\", sum);\n  return 0;\n}`,
      answer: cArrayAnswer,
      explanation: `배열 원소를 모두 더하면 ${cArrayAnswer}입니다.`,
      difficulty: "입문",
      sourceNote: `${config.year} 공개 복원 C 배열/반복문 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.cRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.cRound)}-c-03`,
      type: "c",
      topic: "구조체 포인터 값 변경",
      question:
        `[${config.year} C언어 복원 경향 변형]\n다음 C 코드의 출력 결과를 쓰시오.\n\n#include <stdio.h>\ntypedef struct { int a; int b; } Node;\nvoid func(Node *n){\n  n->a += n->b;\n}\nint main(){\n  Node n = {${config.cStruct.a}, ${config.cStruct.b}};\n  func(&n);\n  printf(\"%d\", n.a);\n  return 0;\n}`,
      answer: cStructAnswer,
      explanation: `포인터로 원본 구조체를 넘겼기 때문에 a 값이 직접 변경되어 ${cStructAnswer}이 됩니다.`,
      difficulty: "기본",
      sourceNote: `${config.year} 공개 복원 C 구조체/포인터 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.cRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.cRound)}-c-04`,
      type: "c",
      topic: "static 변수 유지",
      question:
        `[${config.year} C언어 복원 경향 변형]\n다음 C 코드의 출력 결과를 쓰시오.\n\n#include <stdio.h>\nint func(){\n  static int x = ${config.cStaticStart};\n  x += ${config.cStaticIncrement};\n  return x;\n}\nint main(){\n  printf(\"${cStaticFormat}\", ${cStaticCalls});\n  return 0;\n}`,
      answer: cStaticAnswer,
      explanation: `static 변수는 호출 사이에 유지됩니다. 각 호출 결과를 순서대로 쓰면 ${cStaticAnswer}입니다.`,
      difficulty: "기본",
      sourceNote: `${config.year} 공개 복원 C static 누적 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.cRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
    {
      id: `recovery-${config.year}-${formatRoundId(config.cRound)}-c-05`,
      type: "c",
      topic: "후위 증가 연산",
      question:
        `[${config.year} C언어 복원 경향 변형]\n다음 C 코드의 출력 결과를 쓰시오.\n\n#include <stdio.h>\nint main(){\n  int x = ${config.cIncStart};\n  printf(\"%d %d\", x++, x);\n  return 0;\n}`,
      answer: cIncAnswer,
      explanation: `후위 증가 연산은 현재 값을 먼저 사용한 뒤 1 증가시킵니다. 따라서 ${cIncAnswer}가 출력됩니다.`,
      difficulty: "기본",
      sourceNote: `${config.year} 공개 복원 C 증감 연산 패턴 기반 변형`,
      examTrack: "recovery",
      year: config.year,
      round: config.cRound,
      sourceUrls: sourceUrlsByYear[config.year],
    },
  ];
}

export const extraRecoveryQuestions: StudyQuestion[] = configs.flatMap((config) => [
  ...buildSqlQuestions(config),
  ...buildJavaQuestions(config),
  ...buildPythonQuestions(config),
  ...buildCQuestions(config),
]);



