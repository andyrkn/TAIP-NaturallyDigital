import React from 'react';
import Navbar from '../../components/navbar';
import './contact.styles.scss';

export default function Contact() {
    return (
        <React.Fragment>
            <Navbar />
            <div className="main-content">
                <p>You can contact us on our Facebook, Instagram or Linkedin page.</p>
                <p>We are also available on email at contact@naturallydigital.com</p>
                <p>You can also visit us in person, at our office on Str. General Berthelot, Nr. 16, Iasi 700089</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2712.1769289910358!2d27.572722415615427!3d47.17397237915838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cafb6227e846bd%3A0x193e4b6864504e2c!2sFaculty%20of%20Computer%20Science!5e0!3m2!1sen!2sro!4v1573613587122!5m2!1sen!2sro" width="370" height="350" frameborder="0"></iframe>
            </div>
        </React.Fragment>
    )
}