import React, { Fragment } from "react";
import Breadcumb from "../Layout/breadcumb/breadcumb";
import classes from "./AboutUs.module.css";

export default function AboutUs() {
    const navigateArray = [
        {
            name: "Trang chủ",
            link: "/",
        },
        {
            name: "Giới thiệu",
            link: "/about",
        },
    ];

    return (
        <Fragment>
            <Breadcumb titleInfo="Về chúng tôi" navigateArray={navigateArray} />
            <div className={classes.aboutContainer}>
                <div className={classes.aboutusbody}>
                    <p className={classes.aboutusheader}>
                        Tiệm bánh chúng tôi không chỉ là tiệm bánh, chúng tôi cũng không chỉ là những thợ làm bánh. Thực
                        ra, chúng tôi đều giống các bạn, đều là những người yêu đồ ăn đã bị cuốn hút bởi cái ngọt, nhưng
                        con người mơ mộng với mong muốn tạo ra một thiên đường đồ tráng miệng với ước muốn thỏa mãn bản
                        thân với những món ăn tuyệt vời
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
                        Bắt đầu với túi bột được lựa chọn kĩ càng nhất, thêm đường vào bơ, sau đó trộn chúng lại với
                        những đam mê sâu thẳm nhất của chúng tôi để tạo nên những nắm bột hoàn hảo. Nướng chúng trong
                        các lò nướng bánh cùng với hơi âm của thợ làm bánh và cuối cùng là tạo ra một sản phẩm hoàn hảo
                        với mục đích khiến bạn mê mẩn khi ăn chúng. Sự khác biệt khi thưởng thức bánh của chúng tôi đó
                        là một chút tình yêu, quan tâm và tận tâm
                    </p>
                </div>
                <div className={classes.numberimg}>
                    <img
                        className={classes.contentimg}
                        src="https://media.bakingo.com/images/aboutus/about-heading2.svg"
                        alt="about heading2"
                    />
                    <p className={classes.numberbody}>
                        Chúng tôi thêm cảm ứng kỳ diệu của chúng tôi vào công thức của chúng tôi, để mang lại hương vị
                        và hấp dẫn vào mọi thứ. Với những nguyên liệu tươi ngon và một số phương pháp truyền thống,
                        chúng tôi tạo ra một số loại bánh có một không hai được nướng-tươi-mới-từ-lò để vượt trội vị
                        giác của bạn.
                    </p>
                </div>
                <div className={classes.numberimg}>
                    <img
                        className={classes.contentimg}
                        src="https://media.bakingo.com/images/aboutus/about-heading3.svg"
                        alt="about heading 3"
                    />
                    <p className={classes.numberbody}>
                        Và sau đó, để lấp đầy mỗi khoảnh khắc kỷ niệm với sự hưng phấn và phấn khích, chúng tôi đặt cả
                        trái tim và linh hồn của mình vào việc cung cấp chiếc bánh thơm ngon vào đúng thời điểm bởi vì
                        chúng tôi hiểu! Chúng tôi hiểu những cảm xúc gắn bó với dịp này và vì vậy, chúng tôi luôn nỗ lực
                        để thêm vào những khoảnh khắc hạnh phúc của bạn.
                    </p>
                </div>
                <div className={classes.p2}>
                    Chúng tôi ở đây để xác định lại các tác phẩm kinh điển mọi thời đại để tạo ra một số và những trải
                    nghiệm khó quên. Chúng tôi muốn lấp đầy những khoảng trống trong mọi cuộc trò chuyện bằng một nụ
                    cười.
                </div>
            </div>
        </Fragment>
    );
}
