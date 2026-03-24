import type { StudyQuestion } from "@/lib/types";

export const recoveryQuestions: StudyQuestion[] = [
  {
    id: "recovery-2020-1-sql-01",
    type: "sql",
    topic: "COUNT와 조건 우선순위",
    question:
      "[2020 1회 복원 경향 변형]\n다음 SQL 결과로 맞는 값을 쓰시오.\n\nSELECT COUNT(*)\nFROM SCORE\nWHERE student_no > 100 AND point >= 80 OR student_no = 200;",
    answer: "2",
    explanation:
      "AND가 OR보다 먼저 계산됩니다. 따라서 (student_no > 100 AND point >= 80) 또는 student_no = 200 인 행 수를 세면 됩니다. 공개 복원 SQL 풀이 자료에서 COUNT와 조건 우선순위를 섞어 묻는 패턴이 반복되었습니다.",
    difficulty: "기본",
    sourceNote: "2020 공개 복원 SQL 조건식/COUNT 패턴 기반 변형",
    examTrack: "recovery",
    year: 2020,
    round: "1회",
    questionTables: [
      {
        title: "SCORE 예시 테이블",
        columns: ["student_no", "point"],
        rows: [["101", "70"], ["150", "85"], ["200", "60"], ["201", "90"]],
        note: "조건식 우선순위를 계산할 때 이 표를 기준으로 행 개수를 세면 됩니다.",
      },
    ],
    sourceUrls: [
      "https://roadtofree.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EB%AC%B8%EC%A0%9C-SQL-%EA%B8%B0%EC%B6%9C-%ED%92%80%EC%9D%B4-%EB%AA%A8%EC%9D%8C",
    ],
  },
  {
    id: "recovery-2020-2-java-01",
    type: "java",
    topic: "상속과 오버라이딩",
    question:
      "[2020 2회 복원 경향 변형]\n다음 Java 코드의 출력 결과를 쓰시오.\n\nclass Parent {\n  int calc() { return 1; }\n}\nclass Child extends Parent {\n  @Override\n  int calc() { return 3; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Parent obj = new Child();\n    System.out.print(obj.calc());\n  }\n}",
    answer: "3",
    explanation:
      "참조형은 Parent지만 실제 생성 객체는 Child이므로 오버라이딩된 calc()가 실행됩니다. 2020 개편 이후 Java 출력형 문제에서 다형성과 오버라이딩은 매우 자주 반복되었습니다.",
    difficulty: "입문",
    sourceNote: "2020 복원 후기의 상속/다형성 출력 문제 경향 기반 변형",
    examTrack: "recovery",
    year: 2020,
    round: "2회",
    sourceUrls: ["https://chobopark.tistory.com/460"],
  },
  {
    id: "recovery-2020-3-python-01",
    type: "python",
    topic: "슬라이싱과 append",
    question:
      "[2020 3회 복원 경향 변형]\n다음 Python 코드의 출력 결과를 쓰시오.\n\narr = [1, 2, 3, 4]\npart = arr[1:3]\npart.append(arr[-1])\nprint(sum(part))",
    answer: "9",
    explanation:
      "arr[1:3]은 [2, 3]이고 마지막 값 4를 append하면 [2, 3, 4]가 됩니다. 합계는 9입니다. Python에서는 리스트 슬라이싱과 기본 메서드 조합이 반복적으로 보입니다.",
    difficulty: "입문",
    sourceNote: "2020 공개 복원 Python 리스트/슬라이싱 패턴 기반 변형",
    examTrack: "recovery",
    year: 2020,
    round: "3회",
    sourceUrls: ["https://chobopark.tistory.com/460"],
  },
  {
    id: "recovery-2020-4-c-01",
    type: "c",
    topic: "포인터와 배열",
    question:
      "[2020 C언어 복원 경향 변형]\n다음 C 코드의 출력 결과를 쓰시오.\n\n#include <stdio.h>\nint main(){\n  int a[3] = {2, 4, 6};\n  int *p = a;\n  printf(\"%d\", *(p + 1) + *p);\n  return 0;\n}",
    answer: "6",
    explanation:
      "p는 배열 첫 원소를 가리키므로 *p는 2, *(p+1)은 4입니다. 합은 6입니다. 2020 이후 C 문제에서 포인터와 배열 인덱스 변환은 매우 기본적인 반복 패턴입니다.",
    difficulty: "기본",
    sourceNote: "2020~2022 공개 복원 C 포인터/배열 출력형 패턴 기반 변형",
    examTrack: "recovery",
    year: 2020,
    round: "3회",
    sourceUrls: ["https://chobopark.tistory.com/460"],
  },
  {
    id: "recovery-2021-1-sql-01",
    type: "sql",
    topic: "JOIN 기본 문법",
    question:
      "[2021 1회 복원 경향 변형]\n빈칸에 들어갈 알맞은 SQL 구문을 순서대로 쓰시오.\n\nSELECT a.name, b.major_name\nFROM student a JOIN major b ( 1 ) a.major_id = b.( 2 );",
    answer: "1) ON, 2) major_id",
    explanation:
      "JOIN의 결합 조건은 ON 절에 작성하고, 공통 키 컬럼을 연결해야 합니다. 2021 공개 복원 자료에서는 JOIN ON, UPDATE SET, LIKE 패턴 같은 기본 문법 채우기가 반복되었습니다.",
    difficulty: "입문",
    sourceNote: "2021 공개 복원 JOIN 문법 문제 경향 기반 변형",
    examTrack: "recovery",
    year: 2021,
    round: "1회",
    questionTables: [
      {
        title: "student / major 예시 테이블",
        columns: ["student.student_no", "student.major_id", "major.major_id", "major.major_name"],
        rows: [["1001", "10", "10", "컴공"], ["1002", "20", "20", "정보통신"]],
        note: "JOIN은 공통 키 major_id를 ON 절에서 연결합니다.",
      },
    ],
    sourceUrls: [
      "https://roadtofree.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EB%AC%B8%EC%A0%9C-SQL-%EA%B8%B0%EC%B6%9C-%ED%92%80%EC%9D%B4-%EB%AA%A8%EC%9D%8C",
    ],
  },
  {
    id: "recovery-2021-2-java-01",
    type: "java",
    topic: "예외와 finally",
    question:
      "[2021 2회 복원 경향 변형]\n다음 Java 코드의 출력 결과를 쓰시오.\n\npublic class Main {\n  public static void main(String[] args) {\n    try {\n      int x = 10 / 0;\n      System.out.print('A');\n    } catch (ArithmeticException e) {\n      System.out.print('B');\n    } finally {\n      System.out.print('C');\n    }\n  }\n}",
    answer: "BC",
    explanation:
      "0으로 나누면서 ArithmeticException이 발생해 catch가 실행되어 B를 출력하고, finally는 항상 실행되어 C가 이어집니다. 예외 처리 흐름은 2021~2025에서 매우 자주 반복된 주제입니다.",
    difficulty: "기본",
    sourceNote: "2021 공개 복원 예외 처리/출력 결과 패턴 기반 변형",
    examTrack: "recovery",
    year: 2021,
    round: "2회",
    sourceUrls: ["https://chobopark.tistory.com/460"],
  },
  {
    id: "recovery-2021-3-python-01",
    type: "python",
    topic: "dict와 set",
    question:
      "[2021 3회 복원 경향 변형]\n다음 Python 코드의 출력 결과를 쓰시오.\n\nd = {'a': 1, 'b': 2}\ns = set(d.keys())\nprint(len(s), d['b'])",
    answer: "2 2",
    explanation:
      "딕셔너리 키는 a, b 두 개이므로 set의 길이는 2이고 d['b'] 값은 2입니다. Python 기본 자료형 조합 문제는 복원 후기에서 반복적으로 등장합니다.",
    difficulty: "입문",
    sourceNote: "2021 공개 복원 Python 기본 자료형 출력형 경향 기반 변형",
    examTrack: "recovery",
    year: 2021,
    round: "3회",
    sourceUrls: ["https://chobopark.tistory.com/460"],
  },
  {
    id: "recovery-2021-4-c-01",
    type: "c",
    topic: "구조체와 함수 호출",
    question:
      "[2021 C언어 복원 경향 변형]\n다음 C 코드의 출력 결과를 쓰시오.\n\n#include <stdio.h>\ntypedef struct { int a; int b; } Node;\nvoid func(Node *n){\n  n->a += n->b;\n}\nint main(){\n  Node n = {3, 5};\n  func(&n);\n  printf(\"%d\", n.a);\n  return 0;\n}",
    answer: "8",
    explanation:
      "포인터로 구조체 주소를 넘겼기 때문에 함수 내부에서 원본 n.a가 3+5로 바뀌어 8이 출력됩니다. 구조체 포인터와 값 변경 흐름은 C 문제의 대표 반복 패턴입니다.",
    difficulty: "기본",
    sourceNote: "2021~2022 공개 복원 C 구조체/포인터 패턴 기반 변형",
    examTrack: "recovery",
    year: 2021,
    round: "3회",
    sourceUrls: ["https://techtrail.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-2022%EB%85%84-1%ED%9A%8C-%EA%B8%B0%EC%B6%9C-%EC%BD%94%EB%93%9C-%ED%95%B4%EC%84%A4-C%EC%96%B8%EC%96%B4-Java-Python"],
  },
  {
    id: "recovery-2022-1-sql-01",
    type: "sql",
    topic: "트랜잭션과 SAVEPOINT",
    question:
      "[2022 1회 복원 경향 변형]\n다음 수행 후 최종 반영되는 작업을 고르시오.\n\n1. INSERT A\n2. SAVEPOINT S1\n3. INSERT B\n4. ROLLBACK TO S1\n5. INSERT C\n6. COMMIT",
    answer: "A와 C",
    explanation:
      "SAVEPOINT S1 이후의 B는 ROLLBACK TO S1으로 취소되고, 이후 삽입한 C와 처음 삽입한 A만 COMMIT됩니다. 2022년 전후로 트랜잭션 제어 문제가 꾸준히 출제되었습니다.",
    difficulty: "기본",
    sourceNote: "2022 1회 복원 및 변형문제 자료의 트랜잭션 제어 경향 기반",
    examTrack: "recovery",
    year: 2022,
    round: "1회",
    questionTables: [
      {
        title: "트랜잭션 수행 순서",
        columns: ["순서", "작업"],
        rows: [["1", "INSERT A"], ["2", "SAVEPOINT S1"], ["3", "INSERT B"], ["4", "ROLLBACK TO S1"], ["5", "INSERT C"], ["6", "COMMIT"]],
        note: "SAVEPOINT 이후 되돌리는 구간을 표로 보면 최종 반영값이 더 잘 보입니다.",
      },
    ],
    sourceUrls: ["https://ss-o.tistory.com/165"],
  },
  {
    id: "recovery-2022-2-java-01",
    type: "java",
    topic: "static 변수 누적",
    question:
      "[2022 2회 복원 경향 변형]\n다음 Java 코드의 출력 결과를 쓰시오.\n\nclass Counter {\n  static int value = 1;\n  Counter() { value += 2; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    new Counter();\n    new Counter();\n    System.out.print(Counter.value);\n  }\n}",
    answer: "5",
    explanation:
      "초기값 1에서 생성자 호출 두 번마다 2씩 증가하므로 5가 됩니다. static 변수와 생성자 누적 흐름은 2022~2025 코드 문제에서 반복되는 패턴입니다.",
    difficulty: "기본",
    sourceNote: "2022 복원 후기의 static/생성자 누적 계산형 패턴 기반 변형",
    examTrack: "recovery",
    year: 2022,
    round: "2회",
    sourceUrls: ["https://ss-o.tistory.com/165"],
  },
  {
    id: "recovery-2022-3-python-01",
    type: "python",
    topic: "lambda와 filter",
    question:
      "[2022 3회 복원 경향 변형]\n다음 Python 코드의 출력 결과를 쓰시오.\n\nnums = [1, 2, 3, 4, 5]\nresult = list(filter(lambda x: x % 2 == 1, nums))\nprint(sum(result))",
    answer: "9",
    explanation:
      "홀수만 필터링하면 [1, 3, 5]이고 합은 9입니다. Python에서는 lambda, filter, comprehension처럼 짧은 함수형 문법이 자주 출제되었습니다.",
    difficulty: "기본",
    sourceNote: "2022 공개 복원 Python 함수형 문법 경향 기반 변형",
    examTrack: "recovery",
    year: 2022,
    round: "3회",
    sourceUrls: ["https://ss-o.tistory.com/165"],
  },
  {
    id: "recovery-2022-4-c-01",
    type: "c",
    topic: "구조체 값 변경",
    question:
      "[2022 1회 C언어 복원 경향 변형]\n다음 C 코드의 출력 결과를 쓰시오.\n\n#include <stdio.h>\ntypedef struct { int a; int b; } A;\nstatic void func1(A *m){ m->a *= 10; }\nstatic void func2(A *m){ m->a += m->b; }\nint main(){\n  A m;\n  m.a = 100;\n  func1(&m);\n  m.b = m.a;\n  func2(&m);\n  printf(\"%d\", m.a);\n  return 0;\n}",
    answer: "2000",
    explanation:
      "m.a는 100에서 func1 후 1000이 되고, m.b에 1000을 넣은 뒤 func2에서 a+b를 수행해 2000이 됩니다. 이 패턴은 2022 1회 공개 C/Java/Python 코드 해설 자료에서 대표적으로 다뤄진 구조체 값 변화 흐름입니다.",
    difficulty: "실전",
    sourceNote: "2022 1회 공개 복원 C 구조체/포인터 계산형 패턴 기반 변형",
    examTrack: "recovery",
    year: 2022,
    round: "1회",
    sourceUrls: [
      "https://techtrail.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-2022%EB%85%84-1%ED%9A%8C-%EA%B8%B0%EC%B6%9C-%EC%BD%94%EB%93%9C-%ED%95%B4%EC%84%A4-C%EC%96%B8%EC%96%B4-Java-Python",
    ],
  },
  {
    id: "recovery-2023-1-sql-01",
    type: "sql",
    topic: "GROUP BY와 HAVING",
    question:
      "[2023 1회 복원 경향 변형]\n부서별 평균 점수가 80 이상인 부서만 조회하려고 한다. 빈칸에 들어갈 알맞은 절을 쓰시오.\n\nSELECT dept_id, AVG(score)\nFROM exam_result\nGROUP BY dept_id\n(    ) AVG(score) >= 80;",
    answer: "HAVING",
    explanation:
      "집계 결과에 조건을 거는 절은 HAVING입니다. 2023 복원 자료에서도 GROUP BY 이후 HAVING을 구분하는 문제와 집계 출력형이 계속 보였습니다.",
    difficulty: "기본",
    sourceNote: "2023 공개 복원 SQL 집계/HAVING 패턴 기반 변형",
    examTrack: "recovery",
    year: 2023,
    round: "1회",
    questionTables: [
      {
        title: "exam_result 예시 집계",
        columns: ["dept_id", "score"],
        rows: [["10", "70"], ["10", "90"], ["20", "85"], ["20", "95"]],
        note: "AVG(score) 계산 후 조건을 거는 위치가 HAVING입니다.",
      },
    ],
    sourceUrls: [
      "https://sssinga.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-2023%EB%85%84-3%ED%9A%8C-%EA%B8%B0%EC%B6%9C%EB%AC%B8%EC%A0%9C-%EB%B3%B5%EC%9B%90-%EB%B0%8F-%EB%8B%B5%ED%95%B4%EC%84%A4",
      "https://chobopark.tistory.com/460",
    ],
  },
  {
    id: "recovery-2023-2-java-01",
    type: "java",
    topic: "instance와 static 메서드",
    question:
      "[2023 2회 복원 경향 변형]\n다음 Java 코드의 출력 결과를 쓰시오.\n\nclass P {\n  static void s(){ System.out.print('P'); }\n  void i(){ System.out.print('p'); }\n}\nclass C extends P {\n  static void s(){ System.out.print('C'); }\n  void i(){ System.out.print('c'); }\n}\npublic class Main {\n  public static void main(String[] args) {\n    P obj = new C();\n    obj.s();\n    obj.i();\n  }\n}",
    answer: "Pc",
    explanation:
      "static 메서드는 참조형 P 기준으로 호출되어 P가 출력되고, 인스턴스 메서드는 실제 객체 C의 오버라이딩이 적용되어 c가 출력됩니다. 2023~2025 자바 문제에서 static과 오버라이딩 구분이 강하게 반복됩니다.",
    difficulty: "실전",
    sourceNote: "2023~2025 공개 복원 후기의 static/오버라이딩 혼합 패턴 기반 변형",
    examTrack: "recovery",
    year: 2023,
    round: "2회",
    sourceUrls: [
      "https://sssinga.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-2023%EB%85%84-3%ED%9A%8C-%EA%B8%B0%EC%B6%9C%EB%AC%B8%EC%A0%9C-%EB%B3%B5%EC%9B%90-%EB%B0%8F-%EB%8B%B5%ED%95%B4%EC%84%A4",
      "https://www.kimjaahyun.com/ko/blog/jeongcheogi-practical-exam-review-2025-2",
    ],
  },
  {
    id: "recovery-2023-3-python-01",
    type: "python",
    topic: "리스트 컴프리헨션",
    question:
      "[2023 3회 복원 경향 변형]\n다음 Python 코드의 출력 결과를 쓰시오.\n\nnums = [1, 2, 3, 4]\nout = [n * 2 for n in nums if n % 2 == 0]\nprint(out[0] + out[1])",
    answer: "12",
    explanation:
      "짝수는 2와 4이고 각각 두 배하면 [4, 8]이므로 합은 12입니다. 2023년 공개 복원 문제에서는 Python에서 comprehension과 조건식 조합이 자주 언급되었습니다.",
    difficulty: "기본",
    sourceNote: "2023 공개 복원 Python 컴프리헨션 패턴 기반 변형",
    examTrack: "recovery",
    year: 2023,
    round: "3회",
    sourceUrls: [
      "https://sssinga.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-2023%EB%85%84-3%ED%9A%8C-%EA%B8%B0%EC%B6%9C%EB%AC%B8%EC%A0%9C-%EB%B3%B5%EC%9B%90-%EB%B0%8F-%EB%8B%B5%ED%95%B4%EC%84%A4",
    ],
  },
  {
    id: "recovery-2023-4-c-01",
    type: "c",
    topic: "전위 증가와 포인터",
    question:
      "[2023 C언어 복원 경향 변형]\n다음 C 코드의 출력 결과를 쓰시오.\n\n#include <stdio.h>\nint main(){\n  int x = 2;\n  int *p = &x;\n  printf(\"%d %d\", ++(*p), x);\n  return 0;\n}",
    answer: "3 3",
    explanation:
      "p는 x를 가리키므로 ++(*p)는 x 값을 먼저 3으로 증가시키고 3을 반환합니다. 이후 x도 3입니다. C에서는 전위/후위 연산과 포인터 결합이 대표 함정입니다.",
    difficulty: "기본",
    sourceNote: "2023~2025 공개 복원 C 증감연산/포인터 함정 패턴 기반 변형",
    examTrack: "recovery",
    year: 2023,
    round: "3회",
    sourceUrls: ["https://chobopark.tistory.com/460"],
  },
  {
    id: "recovery-2024-1-sql-01",
    type: "sql",
    topic: "VIEW와 보안",
    question:
      "[2024 1회 복원 경향 변형]\n다음 설명에 가장 알맞은 용어를 쓰시오.\n\n복잡한 SELECT 결과를 가상 테이블처럼 재사용하고, 필요한 열만 노출해 조회를 단순화하는 데이터베이스 객체",
    answer: "VIEW",
    explanation:
      "뷰는 SELECT 결과를 논리적으로 재사용하는 가상 테이블입니다. 2024년 후기 자료에서는 SQL 자체 출력형뿐 아니라 VIEW, INDEX, 프로시저 같은 객체형 개념도 반복 언급되었습니다.",
    difficulty: "입문",
    sourceNote: "2024 공개 후기/복원 자료의 VIEW 반복 출제 경향 기반 변형",
    examTrack: "recovery",
    year: 2024,
    round: "1회",
    questionTables: [
      {
        title: "VIEW로 감추는 원본 예시",
        columns: ["student_no", "name", "phone", "major_name"],
        rows: [["1001", "민수", "010-1111-2222", "컴공"], ["1002", "지연", "010-3333-4444", "정보통신"]],
        note: "VIEW는 이런 원본 테이블에서 필요한 열만 노출하는 상황을 자주 가정합니다.",
      },
    ],
    sourceUrls: ["https://my-dev-diary.tistory.com/17"],
  },
  {
    id: "recovery-2024-2-python-01",
    type: "python",
    topic: "정렬과 리스트 처리",
    question:
      "[2024 2회 복원 경향 변형]\n다음 Python 코드의 출력 결과를 쓰시오.\n\ndef func(values):\n    values.sort()\n    return values[0] * values[-1]\n\nnums = [4, 1, 3, 2]\nprint(func(nums))",
    answer: "4",
    explanation:
      "정렬 후 nums는 [1, 2, 3, 4]가 되고 첫 값과 마지막 값의 곱은 4입니다. 2024년 복원 문제에서는 기본 내장 메서드와 리스트 조작을 섞은 Python 출력형이 다수 보였습니다.",
    difficulty: "기본",
    sourceNote: "2024 공개 복원 Python 함수/리스트 정렬 패턴 기반 변형",
    examTrack: "recovery",
    year: 2024,
    round: "2회",
    sourceUrls: ["https://my-dev-diary.tistory.com/17"],
  },
  {
    id: "recovery-2024-3-java-01",
    type: "java",
    topic: "String equals",
    question:
      "[2024 3회 복원 경향 변형]\n다음 Java 코드의 출력 결과를 쓰시오.\n\npublic class Main {\n  public static void main(String[] args) {\n    String a = \"A\";\n    String b = \"A\";\n    String c = new String(\"A\");\n    System.out.print(a == b ? 'T' : 'F');\n    System.out.print(a.equals(c) ? 'T' : 'F');\n  }\n}",
    answer: "TT",
    explanation:
      "문자열 리터럴 a와 b는 같은 풀 객체를 참조하므로 ==가 true이고, equals는 문자열 내용 비교이므로 a와 c도 true입니다. 2024 3회 공개 풀이 자료에서 String 비교와 equals 패턴이 직접 등장했습니다.",
    difficulty: "실전",
    sourceNote: "2024 3회 공개 복원 Java 문자열 비교 문제 경향 기반 변형",
    examTrack: "recovery",
    year: 2024,
    round: "3회",
    sourceUrls: ["https://my-dev-diary.tistory.com/17"],
  },
  {
    id: "recovery-2024-4-c-01",
    type: "c",
    topic: "static 지역변수",
    question:
      "[2024 C언어 복원 경향 변형]\n다음 C 코드의 출력 결과를 쓰시오.\n\n#include <stdio.h>\nint func(){\n  static int x = 0;\n  x += 2;\n  return x;\n}\nint main(){\n  int sum = 0;\n  for(int i=0; i<3; i++) sum += func();\n  printf(\"%d\", sum);\n  return 0;\n}",
    answer: "12",
    explanation:
      "static 지역변수 x는 호출 사이에 값이 유지되어 2, 4, 6을 반환합니다. 합은 12입니다. 2024~2025 공개 풀이에서 static 누적형 C 문제가 반복 언급됩니다.",
    difficulty: "실전",
    sourceNote: "2024 공개 복원 C static 지역변수 누적 패턴 기반 변형",
    examTrack: "recovery",
    year: 2024,
    round: "3회 수준",
    sourceUrls: ["https://gogo-coding.tistory.com/356"],
  },
  {
    id: "recovery-2025-1-sql-01",
    type: "sql",
    topic: "NULL과 집계",
    question:
      "[2025 1회 복원 경향 변형]\n다음 설명 중 옳은 것을 쓰시오.\n\n1. COUNT(column)은 NULL도 센다.\n2. NULL 비교는 = NULL로 수행한다.\n3. COUNT(*)는 전체 행 수를 센다.",
    answer: "3",
    explanation:
      "COUNT(column)은 NULL을 제외하고, NULL 비교는 IS NULL / IS NOT NULL을 사용합니다. COUNT(*)는 전체 행 수를 세므로 3번이 맞습니다. 최근 후기에서도 SQL 기본기가 실전 점수에 큰 영향을 줬다고 언급됩니다.",
    difficulty: "입문",
    sourceNote: "2025 공개 후기의 SQL 기본기 반복 출제 경향 기반 변형",
    examTrack: "recovery",
    year: 2025,
    round: "1회",
    questionTables: [
      {
        title: "COUNT 예시 테이블",
        columns: ["id", "score"],
        rows: [["1", "90"], ["2", "NULL"], ["3", "75"]],
        note: "COUNT(score)는 NULL을 제외하고, COUNT(*)는 전체 행을 셉니다.",
      },
    ],
    sourceUrls: ["https://www.kimjaahyun.com/ko/blog/jeongcheogi-practical-exam-review-2025-2"],
  },
  {
    id: "recovery-2025-2-java-01",
    type: "java",
    topic: "scope와 예외",
    question:
      "[2025 2회 복원 경향 변형]\n다음 Java 코드의 출력 결과를 쓰시오.\n\npublic class Main {\n  public static void main(String[] args) {\n    int sum = 0;\n    try {\n      for (int i = 1; i <= 3; i++) {\n        sum += i;\n      }\n      throw new RuntimeException();\n    } catch (RuntimeException e) {\n      sum += 10;\n    }\n    System.out.print(sum);\n  }\n}",
    answer: "16",
    explanation:
      "for문에서 sum은 1+2+3으로 6이 되고 RuntimeException이 발생해 catch에서 10을 더해 최종 16입니다. 2025 2회 공개 후기에서는 자바 스코프, 예외 처리, static 문제가 주요 프로그래밍 문항으로 언급되었습니다.",
    difficulty: "실전",
    sourceNote: "2025 2회 공개 후기의 자바 scope/exception 패턴 기반 변형",
    examTrack: "recovery",
    year: 2025,
    round: "2회",
    sourceUrls: ["https://www.kimjaahyun.com/ko/blog/jeongcheogi-practical-exam-review-2025-2"],
  },
  {
    id: "recovery-2025-3-python-01",
    type: "python",
    topic: "dict comprehension과 비트연산",
    question:
      "[2025 3회 수준 복원 경향 변형]\n다음 Python 코드의 출력 결과를 쓰시오.\n\nnums = {i: i & 1 for i in range(1, 5)}\nprint(nums[1] + nums[2] + nums[3] + nums[4])",
    answer: "2",
    explanation:
      "비트 AND 1은 홀수면 1, 짝수면 0이므로 값은 {1:1, 2:0, 3:1, 4:0}입니다. 합은 2입니다. 2025 공개 후기에서 딕셔너리 컴프리헨션과 & 연산이 직접 언급되었습니다.",
    difficulty: "실전",
    sourceNote: "2025 공개 후기의 Python dict comprehension / 비트연산 패턴 기반 변형",
    examTrack: "recovery",
    year: 2025,
    round: "3회",
    sourceUrls: ["https://www.kimjaahyun.com/ko/blog/jeongcheogi-practical-exam-review-2025-2"],
  },
  {
    id: "recovery-2025-4-c-01",
    type: "c",
    topic: "포인터와 구조체 연결",
    question:
      "[2025 2회 C언어 복원 경향 변형]\n다음 C 코드의 출력 결과를 쓰시오.\n\n#include <stdio.h>\ntypedef struct { int x; int y; } Node;\nint main(){\n  Node n = {2, 3};\n  Node *p = &n;\n  p->x += p->y;\n  printf(\"%d %d\", n.x, p->y);\n  return 0;\n}",
    answer: "5 3",
    explanation:
      "포인터 p는 n을 가리키므로 p->x += p->y 수행 후 n.x는 5가 되고 y는 그대로 3입니다. 2025 2회 공개 후기에서는 C 언어의 포인터, 구조체, 연결 리스트류 문제가 다수 언급되었습니다.",
    difficulty: "실전",
    sourceNote: "2025 2회 공개 후기의 C 포인터/구조체 패턴 기반 변형",
    examTrack: "recovery",
    year: 2025,
    round: "2회",
    sourceUrls: [
      "https://www.kimjaahyun.com/ko/blog/jeongcheogi-practical-exam-review-2025-2",
      "https://techtrail.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-2022%EB%85%84-1%ED%9A%8C-%EA%B8%B0%EC%B6%9C-%EC%BD%94%EB%93%9C-%ED%95%B4%EC%84%A4-C%EC%96%B8%EC%96%B4-Java-Python",
    ],
  },
];





