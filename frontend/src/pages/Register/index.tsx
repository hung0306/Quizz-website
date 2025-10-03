import { checkExist, register } from "../../services/userService";
import "../Login/login.scss";
import { Spin, message } from "antd";

import { generateToken } from "../../helpers/generateToken";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const [xoay, setXoay] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // console.log(e.target[0].value, e.target[1].value);
    const target = e.target as HTMLFormElement;
    const fullname = (target[0] as HTMLInputElement).value.trim();
    const email = (target[1] as HTMLInputElement).value.trim();
    const password = (target[2] as HTMLInputElement).value;

    // Basic validations
    if (!fullname) {
      message.error("Vui lòng nhập họ tên");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error("Email không hợp lệ");
      return;
    }
    if (password.length < 6) {
      message.error("Mật khẩu tối thiểu 6 ký tự");
      return;
    }
    setXoay(true);
    const checkExistEmail = await checkExist("email", email);
    if (checkExistEmail.length > 0) {
      message.error("Email đã tồn tại!");
      setXoay(false);
    } else {
      const options = {
        fullname: fullname,
        email: email,
        password: password,
        token: generateToken(),
      };
      const response = await register(options);
      if (response) {
        setXoay(false);
        message.success("Đăng ký thành công");
        setTimeout(() => navigate("/login"), 800);
      } else {
        setXoay(false);
        message.error("Đăng ký không thành công");
      }
    }
  };
  return (
    <>
      {/* <form onSubmit={handleSubmit}>
                <h2>Đăng ký</h2>
                <div>
                    <input placeholder="Nhập họ tên" type="text" />
                </div>
                <div>
                    <input placeholder="Nhập email" type="email" />
                </div>
                <div>
                    <input type="password" placeholder="Nhập mật khẩu" />
                </div>
                <button type="submit">Đăng ký</button>
            </form> */}

      <Spin spinning={xoay} tip="vui lòng chờ...">
        <div className="auth">
          <form className="form__login" onSubmit={handleSubmit}>
            <div>
              <h2 className="form__h2">Đăng ký</h2>
              <p className="form__subtitle">
                Tạo tài khoản mới để bắt đầu học tập.
              </p>

              <div className="form__field">
                <label className="form__label">Họ tên</label>
                <input
                  className="form__login-name"
                  placeholder="Nhập họ tên"
                  type="text"
                  required
                />
              </div>

              <div className="form__field">
                <label className="form__label">Email</label>
                <input
                  required
                  className="form__login-account"
                  placeholder="Nhập email"
                  type="email"
                />
              </div>
              <div className="form__field">
                <label className="form__label">Mật khẩu</label>
                <input
                  required
                  className="form__login-pass"
                  type="password"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <button className="btn form__login-submit" type="submit">
                Đăng ký
              </button>
              <p className="form__helper">
                Đã có tài khoản? <a href="/login">Đăng nhập</a>
              </p>
            </div>
          </form>
        </div>
      </Spin>
    </>
  );
}
export default Register;
