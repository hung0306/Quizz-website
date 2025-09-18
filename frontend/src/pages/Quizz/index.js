import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
import { getCookie } from "../../helpers/cookies";
import { createAns } from "../../services/quizzService";
import "./quizz.scss";

function Quizz() {
  const param = useParams();
  const [dataTopic, setDataTopic] = useState([]);
  const [dataQuestions, setDataQuestion] = useState([]);
  const navigate = useNavigate();
  // console.log(param);
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getTopic(param.id);
      setDataTopic(response);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListQuestion(param.id);
      setDataQuestion(response);
      // console.log(response);
    };
    fetchAPI();
  }, []);
  //  console.log(dataQuestions);
  const handleSubmit = async (e) => {
    // console.log(e);
    e.preventDefault();
    let selected = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;
        selected.push({
          questionId: parseInt(name),
          answer: parseInt(value),
        });
      }
      // console.log(e.target.elements[i].checked);
    }
    // console.log(selected);
    let options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(param.id),
      answers: selected,
    };
    const response = await createAns(options);
    console.log(response);
    if (response) {
      navigate(`/result/${response.id}`);
    }
  };
  return (
    <>
      <div>
        <div className="form-quizz">
          <h2 className="form-quizz__title">
            Bài Quizz chủ đề: {dataTopic && <>{dataTopic.name}</>}
          </h2>
          <form onSubmit={handleSubmit}>
            {dataQuestions.map((item, index) => (
              <div className="form-quizz__item" key={item.id}>
                <p className="form-quizz__question">
                  câu {index + 1}: {item.question}
                </p>
                {item.answers.map((itemAns, indexAns) => (
                  <div className="form-quizz_answer" key={indexAns}>
                    <input
                      type="radio"
                      name={item.id}
                      value={indexAns}
                      id={`quizz-${item.id}-${indexAns}`}
                    />
                    <label htmlFor={`quizz-${item.id}-${indexAns}`}>
                      {itemAns}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <div className="form-quizz__center">
              <button className="btn form-quizz__submit" type="submit">
                Nộp bài
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Quizz;
