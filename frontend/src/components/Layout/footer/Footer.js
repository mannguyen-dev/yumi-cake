import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <section className={classes.footerallcontent}>
            <div className={classes.footerimg}>
                <div className={classes.footercontent}>
                    <div className={classes.yumicakefooter}>
                        <div className={classes.yumicakelogo}>
                            <Link to="/">Yumi Cake</Link>
                        </div>
                        <div className={classes.footerheading}>
                            Thông tin
                            <div className={classes.footerdisc}>Về chúng tôi</div>
                            <div className={classes.footerdisc}>Liên hệ</div>
                            <div className={classes.footerdisc}>Tìm chúng tôi</div>
                            <div className={classes.footerdisc}>Blog</div>
                        </div>
                        <div className={classes.footerheading}>
                            Trợ giúp
                            <div className={classes.footerdisc}>Hủy đơn hàng và hoàn tiền</div>
                            <div className={classes.footerdisc}>Điều khoản</div>
                            <div className={classes.footerdisc}>Dịch vụ</div>
                            <div className={classes.footerdisc}>Bản đồ</div>
                        </div>
                        <div className={classes.footerheading}>
                            Thêm
                            <div className={classes.footerdisc}>Hợp tác</div>
                            <div className={classes.footerdisc}>Khuyến mãi</div>
                            <div className={classes.footerdisc}>Nhượng quyền</div>
                            <div className={classes.footerdisc}>Tải ứng dụng</div>
                        </div>
                        <div className={classes.footerheading}>
                            Theo dõi
                            <div className={classes.logos}>
                                <a href="https://www.facebook.com/mannguyen.dev/">
                                    <div className={classes.footerfacebook}></div>
                                </a>
                                <a href="https://www.facebook.com/mannguyen.dev/">
                                    <div className={classes.footertwitter}></div>
                                </a>
                                <a href="https://www.facebook.com/mannguyen.dev/">
                                    <div className={classes.footerinstagram}></div>
                                </a>
                                <a href="https://www.facebook.com/mannguyen.dev/">
                                    <div className={classes.footerpinterest}></div>
                                </a>
                            </div>
                            <div className={classes.footerheading2}>Nhận thông tin mới nhất</div>
                            <div className={classes["form-group"]}>
                                <input
                                    type="text"
                                    className={classes["form-control"]}
                                    name="Enter email address"
                                    id=""
                                    aria-describedby="helpId"
                                    placeholder="Nhập email tại đây"
                                />
                            </div>
                            <div data-testid="wrapper" className={classes.sub}>
                                <button type="submit" className={classes.subscribe}>
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
