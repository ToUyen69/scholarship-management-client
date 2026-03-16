import React from 'react';
import './footer.css'; // Đảm bảo bạn đã import file css

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Information */}
        <div className="footer-column">
          <h4 className="footer-title">INFORMATION</h4>
          <ul className="footer-list">
            <li><a href="#uel-website">UEL Website</a></li>
            <li><a href="#my-uel">My UEL</a></li>
            <li><a href="#uel-library">UEL Library</a></li>
            <li><a href="#uel-e-learning">UEL E-Learning</a></li>
          </ul>
        </div>

        {/* Cột 2: Contact */}
        <div className="footer-column">
          <h4 className="footer-title">CONTACT</h4>
          <ul className="footer-list contact-list">
            <li>
              <strong>Address:</strong> 669 Đ. Quốc lộ 1, Khu Phố 6, <br />
              P. Linh Xuân, TP. Thủ Đức, TP. Hồ Chí Minh.
            </li>
            <li><strong>Call us:</strong> 028 37244559</li>
            <li><strong>Email:</strong> cntt@uel.edu.vn</li>
          </ul>
        </div>

        {/* Cột 3: Media */}
        <div className="footer-column">
          <h4 className="footer-title">MEDIA</h4>
          <div className="social-icons">
            {/* Thay src bằng link ảnh icon của bạn */}
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="fb" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="ig" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="tt" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
    {/* Đổi class từ footer-logo thành footer-image-info */}
    <img 
        src="/footer.png" 
        alt="UEL Scholarship Hub" 
        className="footer-image-info" 
        />
      </div>
    </footer>
  );
};

export default Footer;