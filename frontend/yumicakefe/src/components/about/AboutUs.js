import React from "react";
import classes from "./AboutUs.module.css";

export default function AboutUs() {
    return (
        <div>
            <div className={classes.corporatebanner}>About Us</div>
            <div className={classes.aboutusbody}>
                <p className={classes.aboutusheader}>
                    {/* We are not just a bakery, we are not just bakers. In fact, we are just
          like you, a bunch of food lovers fascinated with sweet indulgence, who
          dreamt of creating an appetizing fairy land of divine delicacies that
          relishes the utmost desires. */}
                    Tiệm bánh chúng tôi không chỉ là tiệm bánh, chúng tôi cũng không chỉ là những thợ làm bánh. Thực ra,
                    chúng tôi đều giống các bạn, đều là những người yêu đồ ăn đã bị cuốn hút bởi cái ngọt, nhưng con
                    người mơ mộng với mong muốn tạo ra một thiên đường đồ tráng miệng với ước muốn thỏa mãn bản thân với
                    những món ăn tuyệt vời
                </p>
                <img src="https://media.bakingo.com/images/aboutus/aboutus-desktop.png" alt="about us" />
            </div>
            <div className={classes.numberimg}>
                <img
                    className={classes.contentimg}
                    src="https://media.bakingo.com/images/aboutus/about-heading1.svg"
                    alt="about heading"
                />
                <p className={classes.numberbody}>
                    {/* Beginning with finest flour mixed with our passion, sprinkling some
          sugar and butter, blending it with our deepest emotions to create a
          perfect batter. Kindling it in the oven with our warmth and finally
          crafting the intricate creations in the form of some lip-smacking
          cakes, which are out of this world! The only additives you’ll find in
          our products are an extra pinch of love, care and devotion! */}
                    Bắt đầu với túi bột được lựa chọn kĩ càng nhất, thêm đường vào bơ, sau đó trộn chúng lại với những
                    đam mê sâu thẳm nhất của chúng tôi để tạo nên những nắm bột hoàn hảo. Nướng chúng trong các lò nướng
                    bánh cùng với hơi âm của thợ làm bánh và cuối cùng là tạo ra một sản phẩm hoàn hảo với mục đích
                    khiến bạn mê mẩn khi ăn chúng. Sự khác biệt khi thưởng thức bánh của chúng tôi đó là một chút tình
                    yêu, quan tâm và tận tâm
                </p>
            </div>
            <div className={classes.numberimg}>
                <img
                    className={classes.contentimg}
                    src="https://media.bakingo.com/images/aboutus/about-heading2.svg"
                    alt="about heading2"
                />
                <p className={classes.numberbody}>
                    Chúng tôi thêm cảm ứng kỳ diệu của chúng tôi vào công thức của chúng tôi, để mang lại hương vị và
                    hấp dẫn vào mọi thứ. Với những nguyên liệu tươi ngon và một số phương pháp truyền thống, chúng tôi
                    tạo ra một số loại bánh có một không hai được nướng-tươi-mới-từ-lò để vượt trội vị giác của bạn.
                </p>
            </div>
            <div className={classes.numberimg}>
                <img
                    className={classes.contentimg}
                    src="https://media.bakingo.com/images/aboutus/about-heading3.svg"
                    alt="about heading 3"
                />
                <p className={classes.numberbody}>
                    Và sau đó, để lấp đầy mỗi khoảnh khắc kỷ niệm với sự hưng phấn và phấn khích, chúng tôi đặt cả trái
                    tim và linh hồn của mình vào việc cung cấp chiếc bánh thơm ngon vào đúng thời điểm bởi vì chúng tôi
                    hiểu! Chúng tôi hiểu những cảm xúc gắn bó với dịp này và vì vậy, chúng tôi luôn nỗ lực để thêm vào
                    những khoảnh khắc hạnh phúc của bạn.
                </p>
            </div>
            <p className={classes.p2}>
                Chúng tôi ở đây để xác định lại các tác phẩm kinh điển mọi thời đại để tạo ra một số và những trải
                nghiệm khó quên. Chúng tôi muốn lấp đầy những khoảng trống trong mọi cuộc trò chuyện bằng một nụ cười.
            </p>
            <div className={classes.footerallcontent}>
                <div className={classes.footerimg}>
                    <div className={classes.footercontent}>
                        <div className={classes.yumicakefooter}>
                            <div className={classes.yumicakelogo}>Yumi Cake</div>
                            <div className={classes.footerheading}>
                                Know us
                                <div className={classes.footerdisc}>Về chúng tôi</div>
                                <div className={classes.footerdisc}>Liên hệ</div>
                                <div className={classes.footerdisc}>Tìm chúng tôi</div>
                                <div className={classes.footerdisc}>Blog</div>
                            </div>
                            <div className={classes.footerheading}>
                                Need Help
                                <div className={classes.footerdisc}>Cancellation and Refund</div>
                                <div className={classes.footerdisc}>Điều khoản</div>
                                <div className={classes.footerdisc}>Dịch vụ</div>
                                <div className={classes.footerdisc}>Bản đồ</div>
                            </div>
                            <div className={classes.footerheading}>
                                More Info
                                <div className={classes.footerdisc}>Hợp tác</div>
                                <div className={classes.footerdisc}>Coupon & Đề nghị</div>
                                <div className={classes.footerdisc}>Franchise</div>
                                <div className={classes.footerdisc}>Tải App</div>
                            </div>
                            <div className={classes.footerheading}>
                                Find Us
                                <div className={classes.logos}>
                                    <a href="https://www.facebook.com/bakingo/">
                                        <div class={classes.footerfacebook}></div>
                                    </a>
                                    <a href="https://www.facebook.com/bakingo/">
                                        <div class={classes.footertwitter}></div>
                                    </a>
                                    <a href="https://www.facebook.com/bakingo/">
                                        <div class={classes.footerinstagram}></div>
                                    </a>
                                    <a href="https://www.facebook.com/bakingo/">
                                        <div class={classes.footerpinterest}></div>
                                    </a>
                                </div>
                                <div className={classes.footerheading2}>Theo dõi tin mới nhất</div>
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="Enter email address"
                                        id=""
                                        aria-describedby="helpId"
                                        placeholder="Nhập email tại đây"
                                    />
                                </div>
                                <div
                                    data-testid="wrapper"
                                    class="_loading_overlay_wrapper css-79elbk"
                                    className={classes.sub}
                                >
                                    <input type="submit" class="subscribe" value="Subscribe" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
