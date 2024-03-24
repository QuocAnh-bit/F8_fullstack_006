// import React from "react";
import "../footer/footer.scss";
import { footerData, copyrightData } from "../../data";

export default function Footer() {
  const { address, email, logo, phone, socialList, list1, list2 } = footerData;
  return (
    <>
      <hr />
      <footer>
        <div className="container footer">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="logo-footer">
                <a href="#">
                  <img src={logo} alt="logo-footer" />
                </a>
                <div className="address">{address}</div>
                <div>{email}</div>
                <div>{phone}</div>
              </div>
            </div>
            <div className="col-12  col-lg-6">
              <div className="list-menu">
                <div className="row">
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="title-list">About</div>
                    <ul>
                      {list1.map((item, index) => (
                        <li key={index}>
                          <a href={item.href}>{item.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="title-list">Help</div>

                    <ul>
                      {list2.map((item, index) => (
                        <li key={index}>
                          <a href={item.href}>{item.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-12 social-list  col-md-4 col-lg-5">
                    <div className="title-list">Social Media</div>
                    <ul>
                      {socialList.map((item, index) => (
                        <li key={index}>
                          <a href=""></a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div>{copyrightData.text}</div>
        </div>
      </footer>
    </>
  );
}
