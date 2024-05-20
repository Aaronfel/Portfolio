import React, { useState } from "react";
import axios from "axios";
import SuccessModal from "./SuccessModal";

const MIN_LENGHT_COMMENT = 30;
const MIN_LENGHT_SUBJECT = 5;
const MIN_LENGHT_EMAIL = 0;

const Contact: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>();
  const [commentError, setCommentError] = useState<boolean>();
  const [subjectError, setSubjectError] = useState<boolean>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/;

  const handleValidateEmail = (value: string) => {
    if (!emailRegex.test(email as string)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(value);
  };

  const handleValidateComment = (value: string) => {
    if (value.length <= MIN_LENGHT_COMMENT) {
      setCommentError(true);
    } else {
      setCommentError(false);
    }
    setComment(value);
  };

  const handleValidateSubject = (value: string) => {
    if (value.length <= MIN_LENGHT_SUBJECT) {
      setSubjectError(true);
    } else {
      setSubjectError(false);
    }
    setSubject(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/email", {
        sender: email,
        subject: subject,
        message: comment,
      });
      setShowModal(true);
      setEmail("");
      setComment("");
      setSubject("");
    } catch (error) {
      console.log(error);
    }
  };

  const disabledConditions =
    emailError ||
    email.length === MIN_LENGHT_EMAIL ||
    comment.length <= MIN_LENGHT_COMMENT;

  return (
    <section className="animate__animated animate__bounceInRight bg-white mt-10 rounded-md">
      <div className="py-6 lg:py-10 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
          Contact
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
          Lets know each other!
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={(e) => handleValidateEmail(e.target.value)}
            />
            {emailError && (
              <p className="ml-3 mt-2 text-sm text-red-500">
                Invalid Email plase check it again!!
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Subject
            </label>
            <input
              type="subject"
              id="subject"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Human Resources"
              required
              value={subject}
              onChange={(e) => handleValidateSubject(e.target.value)}
            />
            {subjectError && (
              <p className="ml-3 mt-2 text-sm text-red-500">
                Subject cannot be empty.
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500  "
              placeholder="Leave a comment..."
              value={comment}
              onChange={(e) => handleValidateComment(e.target.value)}
            ></textarea>
            {commentError && (
              <p className="ml-3 mt-2 text-sm text-red-500">
                Please insert at least 30 characters
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              disabled={disabledConditions}
              type="submit"
              className={`py-3 px-5 flex justify-end text-sm font-medium text-center text-white rounded-lg ${
                disabledConditions ? "bg-gray-500" : "bg-blue-500"
              }  sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
            >
              Send message
            </button>
          </div>
        </form>
      </div>
      <SuccessModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default Contact;
