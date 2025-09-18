import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListANS } from "../../services/answersService";
import { getListQuestion } from "../../services/questionService";
import "./result.scss";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  useEffect(() => {
    const fetchAPI = async () => {
      const dataANS = await getListANS(params.id);
      const dataQuestions = await getListQuestion(dataANS.topicId);
      console.log(dataANS);
      console.log(dataQuestions);

      let resultFinal = [];
      for (let i = 0; i < dataQuestions.length; i++) {
        resultFinal.push({
          ...dataQuestions[i],
          ...dataANS.answers.find(
            (item) => item.questionId === dataQuestions[i].id
          ),
        });
      }
      setDataResult(resultFinal);

      // Tính số lượng câu trả lời đúng
      let correctCount = 0;
      resultFinal.forEach((item) => {
        if (item.correctAnswer === item.answer) {
          correctCount++;
        }
      });
      setCorrectCount(correctCount);
    };
    fetchAPI();
  }, []);

  return (
    <>
      <div>
        <div className="result__list">
          <h2 className="result__title">
            Kết Quả: {correctCount}/{dataResult.length}
          </h2>
          {dataResult.map((item, index) => (
            <div className="result__item" key={item.id}>
              <p className="result__question">
                câu {index + 1}: {item.question}
                {item.correctAnswer === item.answer ? (
                  <span className="result__tag result__tag-true">Đúng</span>
                ) : (
                  <span className="result__tag result__tag-false">Sai</span>
                )}
              </p>
              {item.answers.map((itemAns, indexAns) => {
                let className = "";
                let checked = false;
                if (item.answer === indexAns) {
                  checked = true;
                  className = "result__item-selected";
                }
                if (item.correctAnswer === indexAns) {
                  className = "result__item-result";
                }
                return (
                  <div className="result__answer" key={indexAns}>
                    <input type="radio" disabled checked={checked} />
                    <label className={className}>{itemAns}</label>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Result;
