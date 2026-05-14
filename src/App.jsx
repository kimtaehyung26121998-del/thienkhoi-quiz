import React, { useMemo, useState } from "react";

const allQuestions = [
  {
    category: "Nội quy - Văn hoá",
    question: "Đâu là cơ hội khi làm nghề Môi giới Bất động sản?",
    options: [
      "Cơ hội làm giàu",
      "Cơ hội học hỏi",
      "Khởi nghiệp vốn 0",
      "Tất cả đáp án trên"
    ],
    answer: 3
  },
  {
    category: "Kỹ năng xem nhà",
    question: "Định giá theo phương pháp dòng tiền dựa trên yếu tố nào?",
    options: [
      "Bán giá cao",
      "Mua giá thấp",
      "Cho thuê hoặc kinh doanh ra thu nhập hàng tháng",
      "Phong thủy"
    ],
    answer: 2
  },
  {
    category: "Đăng tin",
    question: "Đâu là trình tự đúng của khách hàng khi tìm kiếm tin đăng?",
    options: [
      "Khách gọi → Khách truy cập → Khách xem tin",
      "Khách xem tin → Khách truy cập → Khách gọi",
      "Khách gọi → Khách xem tin → Khách truy cập",
      "Khách truy cập → Khách xem tin → Khách gọi"
    ],
    answer: 1
  }
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => {
    return [...allQuestions].sort(() => Math.random() - 0.5);
  }, []);

  const q = questions[current];

  const chooseAnswer = (index) => {
    if (showAnswer) return;

    setSelected(index);
    setShowAnswer(true);

    if (index === q.answer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4">🎉 Hoàn thành</h1>
          <p className="text-2xl mb-6">
            Điểm: <strong>{score}/{questions.length}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-6">
        <div className="flex justify-between mb-6">
          <div className="font-bold">
            Câu {current + 1}/{questions.length}
          </div>

          <div className="font-bold">
            {score} điểm
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-8 leading-relaxed">
          {q.question}
        </h1>

        <div className="space-y-4">
          {q.options.map((option, index) => {
            let style = "border-gray-300";

            if (showAnswer) {
              if (index === q.answer) {
                style = "border-green-500 bg-green-50";
              } else if (index === selected) {
                style = "border-red-500 bg-red-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => chooseAnswer(index)}
                className={`w-full border-2 rounded-2xl p-4 text-left ${style}`}
              >
                <span className="font-bold mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <button
            onClick={nextQuestion}
            className="w-full bg-black text-white rounded-2xl p-4 mt-8"
          >
            {current + 1 === questions.length ? "Xem kết quả" : "Câu tiếp theo"}
          </button>
        )}
      </div>
    </div>
  );
}
