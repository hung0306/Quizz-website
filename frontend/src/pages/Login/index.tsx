import { useNavigate } from "react-router-dom";
import { login } from "../../services/userService";
import { setCookie } from "../../helpers/cookies";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../../actions/login";

import "./login.scss";

import { Spin, message } from "antd";
import { useState } from "react";

interface RootState {
  loginReducer: boolean;
}

function Login(): JSX.Element {
  const islogin = useSelector((state: RootState) => state.loginReducer);
  const navigate = useNavigate();
  const [xoay, setXoay] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // console.log(e.target[0].value, e.target[1].value);
    const target = e.target as HTMLFormElement;
    const email = (target[0] as HTMLInputElement).value.trim();
    const password = (target[1] as HTMLInputElement).value;

    // Basic validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error("Email không hợp lệ");
      return;
    }
    if (!password) {
      message.error("Vui lòng nhập mật khẩu");
      return;
    }
    setXoay(true);
    const response = await login(email, password);
    if (response.length > 0) {
      setXoay(false);
      // console.log(response);
      setCookie("id", response[0].id, 100);
      setCookie("fullname", response[0].fullname, 100);
      setCookie("email", response[0].email, 100);
      setCookie("token", response[0].token, 100);
      if (islogin === false) {
        dispatch(checkLogin(true)); // đã sửa chỗ này (BAN ĐẦU KO CÓ IF) lý do: cái state đó phải thay đổi để load trang.nếu ko có if thì bấm login state sẽ là true, nhưng khi bấm load trang state sẽ quay về gtri ban đầu là false, xong bấm đăng xuất cũng set state là false nên state ko thay đổi (ko load lại)
      } else {
        dispatch(checkLogin(false));
      }

      message.success("Đăng nhập thành công");
      setTimeout(() => navigate("/"), 300);
    } else {
      setXoay(false);
      message.error("Sai tài khoản hoặc mật khẩu");
    }
  };
  return (
    <>
      <Spin spinning={xoay} tip="vui lòng chờ...">
        <div className="auth">
          <form className="form__login" onSubmit={handleSubmit}>
            <div>
              <h2 className="form__h2">Đăng nhập</h2>
              <p className="form__subtitle">
                Chào mừng trở lại! Hãy đăng nhập để tiếp tục.
              </p>
              <div className="form__avatar">
                <img
                  className="form__login-icon"
                  src="https://thanhnien.mediacdn.vn/uploaded/dangkhoa/2021_02_18/hinh1a-emoji_PRHW.jpg?width=500"
                  alt="avatar"
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
                Đăng nhập
              </button>
              <p className="form__helper">
                Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
              </p>
            </div>
          </form>
        </div>
      </Spin>
    </>
  );
}
export default Login;
