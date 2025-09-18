import { Link } from "react-router-dom";
import "./home.scss";
function Home() {
  return (
    <>
      <div className="Homewrap">
        <h2 className="Home">
          {" "}
          <div className="Home__header">Quick Start</div>{" "}
        </h2>
        <div className="Home__des">
          Luyện tập, ôn luyện, kiểm tra và xem kết quả những phần đã làm
        </div>
        <div className="Homewrap__trust">
          <div>
            <img
              src="https://quizizz.com/wf/assets/64c5f50a4898da1574f4e06b_LogosQFW-p-500.png"
              alt=""
            />
          </div>
          <div className="Homewrap__desc">
            Mang lại niềm vui cho các khóa đào tạo của công ty với{" "}
            <span className="Homewrap__desc1">Quizz cho công việc</span>
            <div>
              <Link to="/topic">
                {" "}
                <button className="Homewrap__btn">Khám Phá</button>
              </Link>
            </div>{" "}
          </div>
        </div>
        <section className="Homewrap__features container">
          <h3 className="Homewrap__features-title">Tại sao chọn Quizz?</h3>
          <div className="Homewrap__grid">
            <div className="Homewrap__card">
              <div className="Homewrap__card-icon">🎯</div>
              <h4 className="Homewrap__card-title">Luyện tập theo chủ đề</h4>
              <p className="Homewrap__card-desc">
                Hệ thống chủ đề đa dạng giúp bạn tập trung vào phần kiến thức cần
                cải thiện.
              </p>
            </div>
            <div className="Homewrap__card">
              <div className="Homewrap__card-icon">⚡</div>
              <h4 className="Homewrap__card-title">Giao diện mượt mà</h4>
              <p className="Homewrap__card-desc">
                Tốc độ nhanh, trải nghiệm trực quan, tối ưu cho cả máy tính và
                di động.
              </p>
            </div>
            <div className="Homewrap__card">
              <div className="Homewrap__card-icon">📈</div>
              <h4 className="Homewrap__card-title">Theo dõi kết quả</h4>
              <p className="Homewrap__card-desc">
                Lưu lại lịch sử làm bài, đánh giá tiến bộ qua từng lần luyện
                tập.
              </p>
            </div>
            <div className="Homewrap__card">
              <div className="Homewrap__card-icon">🔒</div>
              <h4 className="Homewrap__card-title">Bảo mật đơn giản</h4>
              <p className="Homewrap__card-desc">
                Đăng nhập nhanh, thông tin người dùng được bảo vệ an toàn.
              </p>
            </div>
          </div>
        </section>
        <div className="Homewrap__img">
          <img src="https://quizizz.com/wf/assets/6501a46f763d217ede2fac83_LOGOs_hidef-p-1080.webp" />
        </div>
        <section className="Homewrap__cta">
          <div className="container Homewrap__cta-inner">
            <div className="Homewrap__cta-text">
              <h3>Bắt đầu hành trình học hiệu quả ngay hôm nay</h3>
              <p>
                Hàng trăm câu hỏi theo chủ đề, giao diện thân thiện và báo cáo
                kết quả rõ ràng.
              </p>
            </div>
            <Link to="/topic">
              <button className="btn">Chọn chủ đề và bắt đầu</button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
export default Home;
