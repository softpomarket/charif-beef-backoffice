/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-duplicate-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState, useEffect, useMemo } from "react";
import { Button, Layout, Menu } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingPage from "../../common/components/loading/page";

import ProductManage from "./manage/ProductManage";

const { Sider } = Layout;

export default function ERP(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const [selectedMenuItem, setSelectedMenuItem] = useState("manage-product");

  const componentsSwitch = (type) => {
    switch (type) {
      case "manage-product":
        return <ProductManage username={location.state.username} />;

      default:
        return null;
    }
  };

  const detectSignin = () => {
    setLoading(true);

    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/");
    } else {
      setLoading(false);
    }
  };

  useMemo(() => {
    detectSignin();
  }, []);

  useEffect(() => {
    setInterval(async () => {
      detectSignin();
    }, 1000);
  }, []);

  return (
    <>
      {!loading ? (
        <div style={{ backgroundColor: "#ECECEC" }}>
          <div style={{ paddingLeft: 0, paddingRight: 0 }}>
            <PageHeader
              title={
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        paddingLeft: 10,
                        display: "grid",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "1rem",
                        }}
                      >
                        <img
                          src="/assets/images/logo/logo-charif-beef.png"
                          alt="logo-charif-beef"
                        />
                        <div>
                          <span style={{ fontWeight: "bolder" }}>
                            Back office
                          </span>
                          <br />
                          of Charif Beef
                          {/* <div></div> */}
                        </div>
                      </div>
                      {/* <label
                        style={{
                          color: "white",
                          fontSize: 16,
                          fontWeight: "initial",
                        }}
                      >
                        <label style={{}}>
                          ผู้ใช้งาน :{" "}
                          {location.state ? location.state.username : "-"}
                        </label>
                      </label> */}
                    </div>
                  </div>
                </>
              }
              extra={[
                <Button
                  type="text"
                  onClick={async () => {
                    // const accessToken = sessionStorage.getItem("accessToken")
                    // const result = await getErpSignOutFetch(accessToken)
                    // if (result.isSuccess) {
                    navigate("/charif-beef-back-office", {
                      state: null,
                    });
                    navigate("/");
                    sessionStorage.removeItem("accessToken");
                    // } else {
                    //     Notification('error', 'ไม่สามารถออกจากระบบได้ กรุณาลองใหม่อีกครั้ง')
                    // }
                  }}
                  style={{ marginTop: 16, color: "white" }}
                >
                  LOGOUT
                </Button>,
              ]}
              style={{ backgroundColor: "black" }}
            ></PageHeader>

            <Layout>
              <Sider width={320} className="site-layout-background">
                <Menu
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["mamage-user"]}
                  mode="inline"
                  theme="dark"
                  selectedKeys={selectedMenuItem}
                  onClick={(e) => {
                    setSelectedMenuItem(e.key);
                  }}
                  style={{ height: "100%" }}
                >
                  <Menu.Item key="manage-product">
                    <label
                      style={{
                        paddingLeft: 10,
                        marginBottom: 0,
                        cursor: "pointer",
                      }}
                    >
                      จัดการผลิตภัณฑ์
                    </label>
                  </Menu.Item>
                </Menu>
              </Sider>

              <article
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div style={{ padding: 20 }}>
                  {componentsSwitch(selectedMenuItem)}
                </div>
              </article>
            </Layout>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
