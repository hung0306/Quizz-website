import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookies";
import "./LayoutDefault.scss";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";

interface RootState {
  loginReducer: boolean;
}

function LayoutDefault(): JSX.Element {
  const token = getCookie("token");
  const user = getCookie("fullname");
  // console.log(token);
  const islogin = useSelector((state: RootState) => state.loginReducer);
  console.log(islogin);
  // cái islogin này mục đích duy nhất là khi login hoặc logout thì set lại giá trị để nó load trang

  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate(-1);
  };

  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">
            <span className="layout-default__back" onClick={handleClick}>
              <RollbackOutlined />
            </span>
            <img
              className="layout-default__img"
              src="https://assets-global.website-files.com/60aca2b71ab9a5e4ececf1cf/62fa6419161d3a641f681ceb_Logo.svg"
              alt="logo"
            />
          </div>
          <div className="menu">
            <ul>
              {token && (
                <>
                  <li>
                    <NavLink className="menu__home" to="/">
                      Trang chủ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="menu__topic" to="/topic">
                      Topic
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="menu__answer" to="/answers">
                      Các câu trả lời
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="layout-default__account">
            {token ? (
              <>
                <span>{user}/</span>
                <NavLink className="layout-default__logout" to="/logout">
                  Đăng xuất
                </NavLink>
              </>
            ) : (
              <>
                {" "}
                <NavLink className="layout-default__login" to="/login">
                  Đăng nhập
                </NavLink>
                <NavLink className="layout-default__register" to="/register">
                  Đăng ký
                </NavLink>
              </>
            )}
          </div>
        </header>
        <main className="layout-default__main">
          <Outlet />
        </main>
        <footer className="layout-default__footer">Code by Lê Ngọc Hùng</footer>
      </div>
    </>
  );
}
export default LayoutDefault;
