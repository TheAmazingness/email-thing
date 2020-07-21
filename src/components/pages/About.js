import React from 'react';

const About = () => (
  <section className="section">
    <div className="container">
      <h1 className="title has-text-centered">AbleMail</h1>
      <div className="about-container">
        <div className="box">
          Email is a crucial tool for workplace communication and collaboration; however, current email clients present accessibility barriers for people with cognitive disabilities. For example, Jon, our Subject Matter Expert (SME), is unable to use email independently. Any job related communication, such as changes to his work schedule, must be emailed to his job coach or his mother who handle the logistics of his employment. AbleMail features a visually simple interface so Jon can (1) comprehend, (2) respond, and (3) compose emails independently. Since Jon struggles with a slow reading rate, text-to-speech capability converts the text of an email into audible words to improve email comprehension. AbleMail provides large and colorful icons that allow Jon to respond to emails with customized pre-written responses. Under AbleMail settings, icons and written responses can easily be changed and new ones added. Lastly, AbleMail allows Jon to compose emails through dictation and to attach an audio clip of his recorded response. AbleMail empowers Jon to communicate with his employer by email, thereby increasing his independence, ownership of his work, privacy, and self-esteem.
        </div>
        <div className="box">
          From the home page, the user can all of the features that AbleMail offers, including text-to-speech, voice recognition, voice emails, quick responses, a help button, as well as the large icons and simplified design. Every button and bit of text is equipped with text-to-speech, while the voice recognition feature is enabled while composing an email or when the user clicks on the voice command button. The user can use voice commands to navigate AbleMail, such as composing emails and reading emails. When composing an email, AbleMail uses voice recognition to write the email, but in case the voice recognition goes awry, an audio clip of the spoken email is also included in the sent message. Quick responses is even easier, as these customizable icons makes it so that the user only needs to click an icon to be able to respond to an email. The help button, found when the user opens an email, allows the user to forward an email to a trusted person to be able to help them further.
        </div>
      </div>
    </div>
  </section>
);

export default About;