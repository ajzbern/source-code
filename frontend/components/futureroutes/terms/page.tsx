import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Header */}
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary hover:text-primary/80"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Home
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Terms of Service
                </h1>
                <p className="text-muted-foreground">
                  Last updated: April 3, 2025
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="w-full py-12 md:py-16">
          <div>
            <>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n  [data-custom-class='body'], [data-custom-class='body'] * {\n          background: transparent !important;\n        }\n[data-custom-class='title'], [data-custom-class='title'] * {\n          font-family: Arial !important;\nfont-size: 26px !important;\ncolor: #000000 !important;\n        }\n[data-custom-class='subtitle'], [data-custom-class='subtitle'] * {\n          font-family: Arial !important;\ncolor: #595959 !important;\nfont-size: 14px !important;\n        }\n[data-custom-class='heading_1'], [data-custom-class='heading_1'] * {\n          font-family: Arial !important;\nfont-size: 19px !important;\ncolor: #000000 !important;\n        }\n[data-custom-class='heading_2'], [data-custom-class='heading_2'] * {\n          font-family: Arial !important;\nfont-size: 17px !important;\ncolor: #000000 !important;\n        }\n[data-custom-class='body_text'], [data-custom-class='body_text'] * {\n          color: #595959 !important;\nfont-size: 14px !important;\nfont-family: Arial !important;\n        }\n[data-custom-class='link'], [data-custom-class='link'] * {\n          color: #3030F1 !important;\nfont-size: 14px !important;\nfont-family: Arial !important;\nword-break: break-word !important;\n        }\n",
                }}
              />
              <div data-custom-class="body">
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    data-custom-class="title"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span className="block-component">
                      <span style={{ fontSize: 19 }} />
                    </span>
                    <span className="question">
                      <strong>
                        <h1>TERMS OF USE</h1>
                      </strong>
                    </span>
                    <span className="statement-end-if-in-editor" />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="subtitle"
                    style={{ lineHeight: "1.5" }}
                  >
                    <strong>Last updated</strong>{" "}
                    <span className="question">
                      <strong>April 15, 2025</strong>
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.1" }}>
                    <br />
                  </div>
                  <div style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div style={{ lineHeight: "1.5" }}>
                    <strong>
                      <span data-custom-class="heading_1">
                        <h2>AGREEMENT TO OUR LEGAL TERMS</h2>
                      </span>
                    </strong>
                  </div>
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    id="agreement"
                    style={{ lineHeight: "1.5" }}
                  ></div>
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      We are{" "}
                      <span
                        className="block-container question question-in-editor"
                        data-id="9d459c4e-c548-e5cb-7729-a118548965d2"
                        data-type="question"
                      >
                        Taskpilot Labs
                      </span>
                      <span className="block-component" /> (
                      <span className="block-component" />'
                      <strong>Company</strong>', '<strong>we</strong>', '
                      <strong>us</strong>', or '<strong>our</strong>'
                      <span className="else-block" />)
                      <span
                        style={{
                          fontSize: "11.0pt",
                          lineHeight: "115%",

                          color: "#595959",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11.0pt",
                            lineHeight: "115%",

                            color: "#595959",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "11.0pt",
                              lineHeight: "115%",

                              color: "#595959",
                            }}
                          >
                            <span className="question">
                              <span className="block-component">.</span>
                            </span>
                          </span>
                          <span className="block-component" />
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="align-middle" style={{ lineHeight: 1 }}>
                  <br />
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      We operate <span className="block-component" />
                      the website{" "}
                      <span style={{ color: "rgb(0, 58, 250)" }}>
                        <span className="question">
                          <a
                            href="https://taskpilot.xyz"
                            target="_blank"
                            data-custom-class="link"
                          >
                            https://taskpilot.xyz
                          </a>
                        </span>
                      </span>{" "}
                      (the <span className="block-component" />'
                      <strong>Site</strong>
                      '
                      <span className="else-block" />)
                      <span className="block-component" />
                      <span className="block-component" />, as well as any other
                      related products and services that refer or link to these
                      legal terms (the <span className="block-component" />'
                      <strong>Legal Terms</strong>'
                      <span className="else-block" />) (collectively, the{" "}
                      <span className="block-component" />'
                      <strong>Services</strong>'
                      <span className="else-block" />
                      ). <span className="block-component" />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: 1 }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      You can contact us by <span className="block-component" />
                      phone at <span className="question">9714356313</span>,
                      email at{" "}
                      <span className="question">
                        contact.taskpilot@gmail.com
                      </span>
                      <span className="block-component" />,
                      <span className="statement-end-if-in-editor" /> or by mail
                      to{" "}
                      <span className="question">
                        Shilp Complex, Sama-Savli Rd,{" "}
                      </span>
                      <span className="block-component" />,{" "}
                      <span className="question">
                        Raghuvir Nagar, Kasturba Nagar, New Sama, Vadodara,
                        Gujarat
                      </span>
                      <span className="statement-end-if-in-editor" />,{" "}
                      <span className="question">Vadodara</span>
                      <span className="block-component" />,{" "}
                      <span className="question">Gujarat</span>
                      <span className="statement-end-if-in-editor" />
                      <span className="block-component" />{" "}
                      <span className="question">390024</span>
                      <span className="statement-end-if-in-editor" />
                      <span className="block-component">
                        <span className="block-component">,&nbsp;</span>
                        <span className="question">India</span>
                        <span className="statement-end-if-in-editor" />
                      </span>
                      .
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: 1 }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      These Legal Terms constitute a legally binding agreement
                      made between you, whether personally or on behalf of an
                      entity (
                      <span className="block-component" />'<strong>y</strong>
                      <strong>ou</strong>'<span className="else-block" />
                      ), and <span className="question">Taskpilot Labs</span>,
                      concerning your access to and use of the Services. You
                      agree that by accessing the Services, you have read,
                      understood, and agreed to be bound by all of these Legal
                      Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS,
                      THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES
                      AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                      <span className="block-component" />
                      <span className="block-component" />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: 1 }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      We will provide you with prior notice of any scheduled
                      changes to the Services you are using. The modified Legal
                      Terms will become effective upon posting or notifying you
                      by{" "}
                      <span className="question">
                        contact.taskpilot@gmail.com
                      </span>
                      , as stated in the email message. By continuing to use the
                      Services after the effective date of any changes, you
                      agree to be bound by the modified terms.
                      <span className="block-component" />
                      <span className="statement-end-if-in-editor" />
                    </span>
                  </div>
                </div>
                <div className="align-middle" style={{ lineHeight: 1 }}>
                  <br />
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      className="block-container if"
                      data-type="if"
                      id="a2595956-7028-dbe5-123e-d3d3a93ed076"
                    >
                      <span data-type="conditional-block">
                        <span data-type="body">
                          <span
                            style={{
                              fontSize: "11.0pt",
                              lineHeight: "115%",
                              fontFamily: "Arial",
                              color: "#595959",
                            }}
                          >
                            <span className="block-component" />
                          </span>
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: 1 }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    We recommend that you print a copy of these Legal Terms for
                    your records.
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_1"
                    style={{ lineHeight: "1.5" }}
                  >
                    <strong>
                      <h2>TABLE OF CONTENTS</h2>
                    </strong>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a href="#services">
                      <span data-custom-class="link">
                        <span
                          style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}
                        >
                          <span data-custom-class="body_text">
                            1. OUR SERVICES
                          </span>
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#ip">
                      <span style={{ color: "rgb(0, 58, 250)" }}>
                        <span data-custom-class="body_text">
                          2. INTELLECTUAL PROPERTY RIGHTS
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#userreps" />
                    <a data-custom-class="link" href="#userreps">
                      <span
                        style={{
                          color: "rbg(0, 58, 250)",
                          fontSize: 15,
                          lineHeight: "1.5",
                        }}
                      >
                        <span data-custom-class="body_text">
                          3. USER REPRESENTATIONS
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <span className="block-component" />
                      </span>
                    </span>
                    <a data-custom-class="link" href="#userreg">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          4. USER REGISTRATION
                        </span>
                      </span>
                    </a>
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <span className="statement-end-if-in-editor" />
                      </span>
                    </span>{" "}
                    <a data-custom-class="link" href="#products" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#products">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#purchases" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#purchases">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                          5. PURCHASES AND PAYMENT
                          <span className="statement-end-if-in-editor" />
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component">
                      <span style={{ fontSize: 15 }} />
                    </span>
                    <a data-custom-class="link" href="#subscriptions">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          6. SUBSCRIPTIONS
                        </span>
                      </span>
                    </a>
                    <span className="statement-end-if-in-editor">
                      <span style={{ fontSize: 15 }} />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <span className="block-component" />
                      </span>
                    </span>{" "}
                    <a data-custom-class="link" href="#software" />{" "}
                    <a data-custom-class="link" href="#software" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#software">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#prohibited" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#prohibited">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          7. PROHIBITED ACTIVITIES
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#ugc" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#ugc">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          8. USER GENERATED CONTRIBUTIONS
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#license" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#license">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          9. CONTRIBUTION <span className="block-component" />
                          LICENCE
                          <span className="else-block" />
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#reviews" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#reviews">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#mobile" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#mobile">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#socialmedia" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#socialmedia">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#thirdparty" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#thirdparty">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#advertisers" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#advertisers">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#sitemanage" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#sitemanage">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          10. SERVICES MANAGEMENT
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#ppyes" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#ppyes">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                          11. PRIVACY POLICY
                          <span className="statement-end-if-in-editor" />
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#ppno" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#ppno">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#dmca" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#dmca">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                        </span>
                      </span>
                    </a>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span style={{ fontSize: 15 }}>
                      <span data-custom-class="body_text">
                        <span className="block-component" />
                        <span className="block-component" />
                        <span className="statement-end-if-in-editor" />
                      </span>
                    </span>{" "}
                    <a data-custom-class="link" href="#terms" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#terms">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          12. TERM AND TERMINATION
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#modifications" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#modifications">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          13. MODIFICATIONS AND INTERRUPTIONS
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#law" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#law">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          14. GOVERNING LAW
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#disputes" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#disputes">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          15. DISPUTE RESOLUTION
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#corrections" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#corrections">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          16. CORRECTIONS
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#disclaimer" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#disclaimer">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          17. DISCLAIMER
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#liability" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#liability">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          18. LIMITATIONS OF LIABILITY
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#indemnification" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#indemnification">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          19. INDEMNIFICATION
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#userdata" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#userdata">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">20. USER DATA</span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#electronic" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#electronic">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          21. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND
                          SIGNATURES
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#california" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component">
                      <span style={{ fontSize: 15 }} />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#california">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          <span className="block-component" />
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#misc" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#misc">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          22. MISCELLANEOUS
                        </span>
                      </span>
                    </a>{" "}
                    <a data-custom-class="link" href="#contact" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <a data-custom-class="link" href="#contact">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        <span data-custom-class="body_text">
                          23. CONTACT US
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_1"
                    style={{ lineHeight: "1.5" }}
                  ></div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_1"
                    id="services"
                    style={{ lineHeight: "1.5" }}
                  >
                    <strong>
                      <span style={{ fontSize: 19, lineHeight: "1.5" }}>
                        <h2>1. OUR SERVICES</h2>
                      </span>
                    </strong>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span style={{ fontSize: 15 }}>
                      The information provided when using the Services is not
                      intended for distribution to or use by any person or
                      entity in any jurisdiction or country where such
                      distribution or use would be contrary to law or regulation
                      or which would subject us to any registration requirement
                      within such jurisdiction or country. Accordingly, those
                      persons who choose to access the Services from other
                      locations do so on their own initiative and are solely
                      responsible for compliance with local laws, if and to the
                      extent local laws are applicable.
                      <span className="block-component" />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                </div>
                <div
                  className="align-middle"
                  data-custom-class="heading_1"
                  style={{ textAlign: "left", lineHeight: "1.5" }}
                >
                  <strong>
                    <span id="ip" style={{ fontSize: 19, lineHeight: "1.5" }}>
                      <h2>2. INTELLECTUAL PROPERTY RIGHTS</h2>
                    </span>
                  </strong>
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_2"
                    style={{ lineHeight: "1.5" }}
                  >
                    <strong>
                      <h3>Our intellectual property</h3>
                    </strong>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      We are the owner or the licensee of all intellectual
                      property rights in our Services, including all source
                      code, databases, functionality, software, website designs,
                      audio, video, text, photographs, and graphics in the
                      Services (collectively, the{" "}
                      <span className="block-component" />
                      'Content'
                      <span className="else-block" />
                      ), as well as the trademarks, service marks, and logos
                      contained therein (the{" "}
                      <span className="block-component" />
                      'Marks'
                      <span className="else-block" />
                      ).
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      Our Content and Marks are protected by copyright and
                      trademark laws (and various other intellectual property
                      rights and unfair competition laws) and treaties
                      <span className="block-component" /> around the world.
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      The Content and Marks are provided in or through the
                      Services <span className="block-component" />
                      'AS IS'
                      <span className="else-block" /> for your{" "}
                      <span className="block-component" />
                      personal, non-commercial use or internal business purpose
                      <span className="statement-end-if-in-editor" /> only.
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_2"
                    style={{ lineHeight: "1.5" }}
                  >
                    <strong>
                      <h3>Your use of our Services</h3>
                    </strong>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span style={{ fontSize: 15 }}>
                      Subject to your compliance with these Legal Terms,
                      including the <span className="block-component" />'
                      <span className="else-block" />
                    </span>
                    <a data-custom-class="link" href="#prohibited">
                      <span style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}>
                        PROHIBITED ACTIVITIES
                      </span>
                    </a>
                    <span style={{ fontSize: 15 }}>
                      <span className="block-component" />'
                      <span className="else-block" /> section below, we grant
                      you a non-exclusive, non-transferable, revocable{" "}
                      <span className="block-component" />
                      licence
                      <span className="else-block" /> to:
                    </span>
                  </div>
                  <ul>
                    <li
                      className="MsoNormal"
                      data-custom-class="body_text"
                      style={{ lineHeight: "1.5" }}
                    >
                      <span style={{ fontSize: 15 }}>
                        access the Services; and
                      </span>
                    </li>
                    <li
                      className="MsoNormal"
                      data-custom-class="body_text"
                      style={{ lineHeight: "1.5" }}
                    >
                      <span style={{ fontSize: 15 }}>
                        download or print a copy of any portion of the Content
                        to which you have properly gained access,
                      </span>
                    </li>
                  </ul>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      solely for your <span className="block-component" />
                      personal, non-commercial use or internal business purpose
                      <span className="statement-end-if-in-editor" />.
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      Except as set out in this section or elsewhere in our
                      Legal Terms, no part of the Services and no Content or
                      Marks may be copied, reproduced, aggregated, republished,
                      uploaded, posted, publicly displayed, encoded, translated,
                      transmitted, distributed, sold, licensed, or otherwise
                      exploited for any commercial purpose whatsoever, without
                      our express prior written permission.
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      If you wish to make any use of the Services, Content, or
                      Marks other than as set out in this section or elsewhere
                      in our Legal Terms, please address your request to:{" "}
                      <span className="question">
                        contact.taskpilot@gmail.com
                      </span>
                      . If we ever grant you the permission to post, reproduce,
                      or publicly display any part of our Services or Content,
                      you must identify us as the owners or licensors of the
                      Services, Content, or Marks and ensure that any copyright
                      or proprietary notice appears or is visible on posting,
                      reproducing, or displaying our Content.
                    </span>
                  </div>
                </div>
                <div className="align-middle" style={{ lineHeight: "1.5" }}>
                  <br />
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      We reserve all rights not expressly granted to you in and
                      to the Services, Content, and Marks.
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      Any breach of these Intellectual Property Rights will
                      constitute a material breach of our Legal Terms and your
                      right to use our Services will terminate immediately.
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_2"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "1.5",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      <strong />
                      <h3>
                        <strong>
                          Your submissions
                          <span className="block-component" />
                        </strong>
                      </h3>
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span style={{ fontSize: 15 }}>
                      Please review this section and the{" "}
                      <span className="block-component" />
                      '<span className="else-block" />
                      <a data-custom-class="link" href="#prohibited">
                        <span style={{ color: "rgb(0, 58, 250)" }}>
                          PROHIBITED ACTIVITIES
                        </span>
                      </a>
                      <span className="block-component" />'
                      <span className="else-block" /> section carefully prior to
                      using our Services to understand the (a) rights you give
                      us and (b) obligations you have when you post or upload
                      any content through the Services.
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span style={{ fontSize: 15 }}>
                      <strong>Submissions:</strong> By directly sending us any
                      question, comment, suggestion, idea, feedback, or other
                      information about the Services (
                      <span className="block-component" />
                      'Submissions'
                      <span className="else-block" />
                      ), you agree to assign to us all intellectual property
                      rights in such Submission. You agree that we shall own
                      this Submission and be entitled to its unrestricted use
                      and dissemination for any lawful purpose, commercial or
                      otherwise, without acknowledgment or compensation to you.
                      <span className="block-component" />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span style={{ fontSize: 15 }}>
                      <strong>
                        You are responsible for what you post or upload:
                      </strong>{" "}
                      By sending us Submissions
                      <span className="block-component" /> through any part of
                      the Services
                      <span className="block-component" /> you:
                    </span>
                  </div>
                  <ul>
                    <li
                      className="MsoNormal"
                      data-custom-class="body_text"
                      style={{ lineHeight: "1.5" }}
                    >
                      <span style={{ fontSize: 15 }}>
                        confirm that you have read and agree with our{" "}
                        <span className="block-component" />'
                        <span className="else-block" />
                      </span>
                      <a data-custom-class="link" href="#prohibited">
                        <span
                          style={{ color: "rgb(0, 58, 250)", fontSize: 15 }}
                        >
                          PROHIBITED ACTIVITIES
                        </span>
                      </a>
                      <span style={{ fontSize: 15 }}>
                        <span className="block-component" />'
                        <span className="else-block" /> and will not post, send,
                        publish, upload, or transmit through the Services any
                        Submission
                        <span className="block-component" /> that is illegal,
                        harassing, hateful, harmful, defamatory, obscene,
                        bullying, abusive, discriminatory, threatening to any
                        person or group, sexually explicit, false, inaccurate,
                        deceitful, or misleading;
                      </span>
                    </li>
                    <li
                      className="MsoNormal"
                      data-custom-class="body_text"
                      style={{ lineHeight: "1.5" }}
                    >
                      <span style={{ fontSize: 15 }}>
                        to the extent permissible by applicable law, waive any
                        and all moral rights to any such Submission
                        <span className="block-component" />;
                      </span>
                    </li>
                    <li
                      className="MsoNormal"
                      data-custom-class="body_text"
                      style={{ lineHeight: "1.5" }}
                    >
                      <span style={{ fontSize: 15 }}>
                        warrant that any such Submission
                        <span className="block-component" /> are original to you
                        or that you have the necessary rights and{" "}
                        <span className="block-component" />
                        licences
                        <span className="else-block" /> to submit such
                        Submissions
                        <span className="block-component" /> and that you have
                        full authority to grant us the above-mentioned rights in
                        relation to your Submissions
                        <span className="block-component" />; and
                      </span>
                    </li>
                    <li
                      className="MsoNormal"
                      data-custom-class="body_text"
                      style={{ lineHeight: "1.5" }}
                    >
                      <span style={{ fontSize: 15 }}>
                        warrant and represent that your Submissions
                        <span className="block-component" /> do not constitute
                        confidential information.
                      </span>
                    </li>
                  </ul>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    You are solely responsible for your Submissions
                    <span className="block-component" /> and you expressly agree
                    to reimburse us for any and all losses that we may suffer
                    because of your breach of (a) this section, (b) any third
                    party’s intellectual property rights, or (c) applicable law.
                    <span className="block-component" />
                    <span className="block-component" />
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_1"
                    id="userreps"
                    style={{ lineHeight: "1.5" }}
                  >
                    <strong>
                      <span
                        style={{
                          lineHeight: "1.5",
                          fontFamily: "Arial",
                          fontSize: 19,
                        }}
                      >
                        <h2>3. USER REPRESENTATIONS</h2>
                      </span>
                    </strong>
                  </div>
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      By using the Services, you represent and warrant that:
                    </span>
                    <span
                      className="block-container if"
                      data-type="if"
                      id="d2d82ca8-275f-3f86-8149-8a5ef8054af6"
                    >
                      <span data-type="conditional-block">
                        <span
                          className="block-component"
                          data-record-question-key="user_account_option"
                          data-type="statement"
                        />{" "}
                        <span data-type="body">
                          <span
                            style={{
                              color: "rgb(89, 89, 89)",
                              fontSize: "11pt",
                            }}
                          >
                            (
                          </span>
                          <span
                            style={{
                              color: "rgb(89, 89, 89)",
                              fontSize: "14.6667px",
                            }}
                          >
                            1
                          </span>
                          <span
                            style={{
                              color: "rgb(89, 89, 89)",
                              fontSize: "11pt",
                            }}
                          >
                            ) all registration information you submit will be
                            true, accurate, current, and complete; (
                          </span>
                          <span
                            style={{
                              color: "rgb(89, 89, 89)",
                              fontSize: "14.6667px",
                            }}
                          >
                            2
                          </span>
                          <span
                            style={{
                              color: "rgb(89, 89, 89)",
                              fontSize: "11pt",
                            }}
                          >
                            ) you will maintain the accuracy of such information
                            and promptly update such registration information as
                            necessary;
                          </span>
                        </span>
                      </span>
                      <span
                        className="statement-end-if-in-editor"
                        data-type="close"
                      />
                      &nbsp;
                    </span>
                    <span
                      style={{ color: "rgb(89, 89, 89)", fontSize: "11pt" }}
                    >
                      (
                    </span>
                    <span
                      style={{
                        color: "rgb(89, 89, 89)",
                        fontSize: "14.6667px",
                      }}
                    >
                      3
                    </span>
                    <span
                      style={{ color: "rgb(89, 89, 89)", fontSize: "11pt" }}
                    >
                      ) you have the legal capacity and you agree to comply with
                      these Legal Terms;
                    </span>
                    <span
                      className="block-container if"
                      data-type="if"
                      id="8d4c883b-bc2c-f0b4-da3e-6d0ee51aca13"
                    >
                      <span data-type="conditional-block">
                        <span
                          className="block-component"
                          data-record-question-key="user_u13_option"
                          data-type="statement"
                        />
                        &nbsp;
                      </span>
                      <span
                        style={{ color: "rgb(89, 89, 89)", fontSize: "11pt" }}
                      >
                        (
                      </span>
                      <span
                        style={{
                          color: "rgb(89, 89, 89)",
                          fontSize: "14.6667px",
                        }}
                      >
                        4
                      </span>
                      <span
                        style={{ color: "rgb(89, 89, 89)", fontSize: "11pt" }}
                      >
                        ) you are not a minor in the jurisdiction in which you
                        reside
                        <span
                          className="block-container if"
                          data-type="if"
                          id="76948fab-ec9e-266a-bb91-948929c050c9"
                        >
                          <span data-type="conditional-block">
                            <span
                              className="block-component"
                              data-record-question-key="user_o18_option"
                              data-type="statement"
                            />
                          </span>
                          ; (
                        </span>
                      </span>
                      <span
                        style={{
                          color: "rgb(89, 89, 89)",
                          fontSize: "14.6667px",
                        }}
                      >
                        5
                      </span>
                      <span
                        style={{ color: "rgb(89, 89, 89)", fontSize: "11pt" }}
                      >
                        ) you will not access the Services through automated or
                        non-human means, whether through a bot, script or
                        otherwise; (
                      </span>
                      <span
                        style={{
                          color: "rgb(89, 89, 89)",
                          fontSize: "14.6667px",
                        }}
                      >
                        6
                      </span>
                      <span
                        style={{ color: "rgb(89, 89, 89)", fontSize: "11pt" }}
                      >
                        ) you will not use the Services for any illegal or{" "}
                        <span className="block-component" />
                        unauthorised
                        <span className="else-block" /> purpose; and (
                      </span>
                      <span
                        style={{
                          color: "rgb(89, 89, 89)",
                          fontSize: "14.6667px",
                        }}
                      >
                        7
                      </span>
                      <span
                        style={{ color: "rgb(89, 89, 89)", fontSize: "11pt" }}
                      >
                        ) your use of the Services will not violate any
                        applicable law or regulation.
                      </span>
                      <span
                        style={{
                          color: "rgb(89, 89, 89)",
                          fontSize: "14.6667px",
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="align-middle" style={{ lineHeight: "1.5" }}>
                  <br />
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    style={{ textAlign: "justify", lineHeight: "115%" }}
                  >
                    <div
                      className="MsoNormal"
                      style={{ lineHeight: "17.25px" }}
                    >
                      <div
                        className="MsoNormal"
                        data-custom-class="body_text"
                        style={{ lineHeight: "1.5", textAlign: "left" }}
                      >
                        <span
                          style={{
                            fontSize: "11pt",
                            lineHeight: "16.8667px",
                            color: "rgb(89, 89, 89)",
                          }}
                        >
                          If you provide any information that is untrue,
                          inaccurate, not current, or incomplete, we have the
                          right to suspend or terminate your account and refuse
                          any and all current or future use of the Services (or
                          any portion thereof).
                        </span>
                      </div>
                      <div
                        className="MsoNormal"
                        style={{ lineHeight: "1.1", textAlign: "left" }}
                      >
                        <span className="block-component" />
                      </div>
                      <div
                        className="MsoNormal"
                        style={{ lineHeight: "1.5", textAlign: "left" }}
                      >
                        <br />
                      </div>
                    </div>
                    <div className="MsoNormal" style={{ lineHeight: 1 }}>
                      <span data-type="conditional-block">
                        <span data-type="body">
                          <div
                            className="MsoNormal"
                            data-custom-class="heading_1"
                            id="userreg"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <strong>
                              <span style={{ lineHeight: "1.5", fontSize: 19 }}>
                                <h2>4. USER REGISTRATION</h2>
                              </span>
                            </strong>
                          </div>
                        </span>
                      </span>
                    </div>
                    <div className="MsoNormal" style={{ lineHeight: 1 }}>
                      <span data-type="conditional-block">
                        <span data-type="body">
                          <div
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ textAlign: "left", lineHeight: "1.5" }}
                          >
                            <span
                              style={{
                                fontSize: "11pt",
                                lineHeight: "16.8667px",
                                color: "rgb(89, 89, 89)",
                              }}
                            >
                              You may be required to register to use the
                              Services. You agree to keep your password
                              confidential and will be responsible for all use
                              of your account and password. We reserve the right
                              to remove, reclaim, or change a username you
                              select if we determine, in our sole discretion,
                              that such username is inappropriate, obscene, or
                              otherwise objectionable.
                              <span
                                className="statement-end-if-in-editor"
                                data-type="close"
                              />
                            </span>
                          </div>
                        </span>
                      </span>
                      <span className="block-component">
                        <span style={{ fontSize: 15 }} />
                      </span>
                    </div>
                    <div
                      className="MsoNormal"
                      style={{ lineHeight: "1.5", textAlign: "left" }}
                    >
                      <span className="block-component">
                        <span style={{ fontSize: 15 }} />
                      </span>
                    </div>
                    <div
                      className="MsoNormal"
                      style={{ lineHeight: "1.5", textAlign: "left" }}
                    >
                      <br />
                    </div>
                  </div>
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_1"
                    id="purchases"
                    style={{ lineHeight: "1.5" }}
                  >
                    <strong>
                      <span
                        style={{
                          lineHeight: "1.5",
                          fontFamily: "Arial",
                          fontSize: 19,
                        }}
                      >
                        <h2>5. PURCHASES AND PAYMENT</h2>
                      </span>
                    </strong>
                  </div>
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component">
                      <span style={{ fontSize: 15 }} />
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      We accept the following forms of payment:
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    style={{ textAlign: "justify", lineHeight: "115%" }}
                  >
                    <div
                      className="MsoNormal"
                      style={{ textAlign: "left", lineHeight: 1 }}
                    >
                      <br />
                    </div>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5", marginLeft: 20 }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      <span className="forloop-component" />- &nbsp;
                      <span className="question">PayPal</span>
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5", marginLeft: 20 }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      <span className="forloop-component" />- &nbsp;
                      <span className="question">Discover</span>
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5", marginLeft: 20 }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      <span className="forloop-component" />- &nbsp;
                      <span className="question">American Express</span>
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5", marginLeft: 20 }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      <span className="forloop-component" />- &nbsp;
                      <span className="question">Mastercard</span>
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5", marginLeft: 20 }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      <span className="forloop-component" />- &nbsp;
                      <span className="question">Visa</span>
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5", marginLeft: 20 }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      <span className="forloop-component" />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: 1 }}>
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      <br />
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      You agree to provide current, complete, and accurate
                      purchase and account information for all purchases made
                      via the Services. You further agree to promptly update
                      account and payment information, including email address,
                      payment method, and payment card expiration date, so that
                      we can complete your transactions and contact you as
                      needed. Sales tax will be added to the price of purchases
                      as deemed required by us. We may change prices at any
                      time. All payments shall be&nbsp;
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      in <span className="question">US dollars</span>.
                    </span>
                  </div>
                </div>
                <div className="align-middle" style={{ lineHeight: "1.5" }}>
                  <br />
                </div>
                <div className="align-middle" style={{ textAlign: "left" }}>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      You agree to pay all charges at the prices then in effect
                      for your purchases and any applicable shipping fees, and
                      you <span className="block-component" />
                      authorise
                      <span className="else-block" /> us to charge your chosen
                      payment provider for any such amounts upon placing your
                      order. We reserve the right to correct any errors or
                      mistakes in pricing, even if we have already requested or
                      received payment.
                    </span>
                  </div>
                </div>
                <div className="align-middle" style={{ lineHeight: "1.5" }}>
                  <br />
                </div>
                <div
                  className="align-middle"
                  style={{ textAlign: "left", lineHeight: "1.5" }}
                >
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      We reserve the right to refuse any order placed through
                      the Services. We may, in our sole discretion, limit or
                      cancel quantities purchased per person, per household, or
                      per order. These restrictions may include orders placed by
                      or under the same customer account, the same payment
                      method, and/or orders that use the same billing or
                      shipping address. We reserve the right to limit or
                      prohibit orders that, in our sole{" "}
                      <span className="block-component" />
                      judgement
                      <span className="else-block" />, appear to be placed by
                      dealers, resellers, or distributors.
                    </span>
                    <span
                      style={{
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      <span
                        data-type="conditional-block"
                        style={{ color: "rgb(10, 54, 90)", textAlign: "left" }}
                      >
                        <span
                          className="block-component"
                          data-record-question-key="return_option"
                          data-type="statement"
                          style={{ fontSize: 15 }}
                        />
                      </span>
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component">
                      <span style={{ fontSize: 15 }} />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_1"
                    id="subscriptions"
                    style={{ lineHeight: "1.5" }}
                  >
                    <strong>
                      <span style={{ fontSize: 19, lineHeight: "1.5" }}>
                        <h2>6. SUBSCRIPTIONS</h2>
                      </span>
                    </strong>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_2"
                    style={{ lineHeight: "1.5" }}
                  >
                    <strong>
                      <span style={{ fontSize: 15, lineHeight: "1.5" }}>
                        <h3>Billing and Renewal</h3>
                      </span>
                    </strong>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span style={{ fontSize: 15 }}>
                      <span className="block-component" />
                      Your subscription will continue and automatically renew
                      unless <span className="block-component" />
                      cancelled
                      <span className="else-block" />. You consent to our
                      charging your payment method on a recurring basis without
                      requiring your prior approval for each recurring charge,
                      until such time as you cancel the applicable order.
                      <span className="block-component" /> The length of your
                      billing cycle <span className="block-component" />
                      will depend on the type of subscription plan you choose
                      when you subscribed to the Services
                      <span className="else-block" />.
                      <span className="statement-end-if-in-editor" />
                      <span className="else-block" />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component">
                      <span style={{ fontSize: 15 }} />
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_2"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span style={{ fontSize: 15, lineHeight: "1.5" }}>
                      <strong>
                        <h3>Free Trial</h3>
                      </strong>
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span style={{ fontSize: 15 }}>
                      We offer a <span className="question">14</span>-day free
                      trial to new users who register with the Services.{" "}
                      <span className="block-component" />
                      <span className="question">__________</span> at the end of
                      the free trial.
                      <span className="else-block" />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span style={{ fontSize: 15 }}>
                      <span className="statement-end-if-in-editor" />
                    </span>
                    <span className="block-component">
                      <span style={{ fontSize: 15 }} />
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_2"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span style={{ fontSize: 15, lineHeight: "1.5" }}>
                      <strong>
                        <h3>Cancellation</h3>
                      </strong>
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span className="block-component">
                      <span style={{ fontSize: 15 }} />
                    </span>
                    <span style={{ fontSize: 15 }}>
                      All purchases are non-refundable.{" "}
                      <span className="statement-end-if-in-editor" />
                      <span className="block-component" />
                      You can cancel your subscription at any time by logging
                      into your account.
                      <span className="block-component" /> Your cancellation
                      will take effect at the end of the current paid term. If
                      you have any questions or are unsatisfied with our
                      Services, please email us at{" "}
                      <span className="question">
                        contact.taskpilot@gmail.com
                      </span>
                      .
                      <span className="statement-end-if-in-editor" />
                      <br />
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="heading_2"
                    style={{ lineHeight: "1.5" }}
                  >
                    <strong>
                      <span style={{ fontSize: 15, lineHeight: "1.5" }}>
                        <h3>Fee Changes</h3>
                      </span>
                    </strong>
                  </div>
                  <span style={{ fontSize: 15 }}>
                    <span data-custom-class="body_text">
                      We may, from time to time, make changes to the
                      subscription fee and will communicate any price changes to
                      you in accordance with applicable law.
                    </span>
                  </span>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span style={{ fontSize: 15 }}>
                      <span className="statement-end-if-in-editor" />
                    </span>
                    <span className="block-component">
                      <span style={{ fontSize: 15 }} />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span className="block-component" />
                  </div>
                  <div
                    className="MsoNormal"
                    style={{ textAlign: "justify", lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      <span
                        data-type="conditional-block"
                        style={{ color: "rgb(10, 54, 90)", textAlign: "left" }}
                      >
                        <span data-type="body">
                          <div
                            className="MsoNormal"
                            style={{ fontSize: 15, lineHeight: "1.5" }}
                          >
                            <br />
                          </div>
                        </span>
                      </span>
                    </span>
                    <div
                      className="MsoNormal"
                      data-custom-class="heading_1"
                      id="prohibited"
                      style={{ textAlign: "left", lineHeight: "1.5" }}
                    >
                      <strong>
                        <span style={{ lineHeight: "1.5", fontSize: 19 }}>
                          <h2>7. PROHIBITED ACTIVITIES</h2>
                        </span>
                      </strong>
                    </div>
                  </div>
                  <div
                    className="MsoNormal"
                    style={{ textAlign: "justify", lineHeight: 1 }}
                  >
                    <div
                      className="MsoNormal"
                      data-custom-class="body_text"
                      style={{ lineHeight: "1.5", textAlign: "left" }}
                    >
                      <span
                        style={{
                          fontSize: "11pt",
                          lineHeight: "16.8667px",
                          color: "rgb(89, 89, 89)",
                        }}
                      >
                        You may not access or use the Services for any purpose
                        other than that for which we make the Services
                        available. The Services may not be used in connection
                        with any commercial <span className="block-component" />
                        endeavours
                        <span className="else-block" /> except those that are
                        specifically endorsed or approved by us.
                      </span>
                    </div>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    style={{ textAlign: "justify", lineHeight: 1 }}
                  >
                    <div
                      className="MsoNormal"
                      style={{ lineHeight: "17.25px" }}
                    >
                      <div className="MsoNormal" style={{ lineHeight: "1.1" }}>
                        <div
                          className="MsoNormal"
                          style={{ lineHeight: "17.25px" }}
                        >
                          <div
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span
                              style={{
                                fontSize: "11pt",
                                lineHeight: "16.8667px",
                                color: "rgb(89, 89, 89)",
                              }}
                            >
                              As a user of the Services, you agree not to:
                            </span>
                          </div>
                        </div>
                        <ul>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span
                              style={{
                                fontSize: "11pt",
                                lineHeight: "16.8667px",
                                color: "rgb(89, 89, 89)",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "sans-serif",
                                  fontSize: 15,
                                  fontStyle: "normal",
                                  fontVariantLigatures: "normal",
                                  fontVariantCaps: "normal",
                                  fontWeight: 400,
                                  letterSpacing: "normal",
                                  orphans: 2,
                                  textAlign: "justify",
                                  textIndent: "-29.4px",
                                  textTransform: "none",
                                  whiteSpace: "normal",
                                  widows: 2,
                                  wordSpacing: 0,
                                  WebkitTextStrokeWidth: 0,
                                  backgroundColor: "rgb(255, 255, 255)",
                                  textDecorationStyle: "initial",
                                  textDecorationColor: "initial",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                Systematically retrieve data or other content
                                from the Services to create or compile, directly
                                or indirectly, a collection, compilation,
                                database, or directory without written
                                permission from us.
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Trick, defraud, or mislead us and other
                                      users, especially in any attempt to learn
                                      sensitive account information such as user
                                      passwords.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Circumvent, disable, or otherwise
                                      interfere with security-related features
                                      of the Services, including features that
                                      prevent or restrict the use or copying of
                                      any Content or enforce limitations on the
                                      use of the Services and/or the Content
                                      contained therein.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Disparage, tarnish, or otherwise harm, in
                                      our opinion, us and/or the Services.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Use any information obtained from the
                                      Services in order to harass, abuse, or
                                      harm another person.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Make improper use of our support services
                                      or submit false reports of abuse or
                                      misconduct.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Use the Services in a manner inconsistent
                                      with any applicable laws or regulations.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Engage in{" "}
                                      <span className="block-component" />
                                      unauthorised
                                      <span className="else-block" /> framing of
                                      or linking to the Services.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Upload or transmit (or attempt to upload
                                      or to transmit) viruses, Trojan horses, or
                                      other material, including excessive use of
                                      capital letters and spamming (continuous
                                      posting of repetitive text), that
                                      interferes with any party’s uninterrupted
                                      use and enjoyment of the Services or
                                      modifies, impairs, disrupts, alters, or
                                      interferes with the use, features,
                                      functions, operation, or maintenance of
                                      the Services.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Engage in any automated use of the system,
                                      such as using scripts to send comments or
                                      messages, or using any data mining,
                                      robots, or similar data gathering and
                                      extraction tools.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Delete the copyright or other proprietary
                                      rights notice from any Content.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Attempt to impersonate another user or
                                      person or use the username of another
                                      user.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Upload or transmit (or attempt to upload
                                      or to transmit) any material that acts as
                                      a passive or active information collection
                                      or transmission mechanism, including
                                      without limitation, clear graphics
                                      interchange formats (
                                      <span className="block-component" />
                                      'gifs'
                                      <span className="else-block" />
                                      ), 1×1 pixels, web bugs, cookies, or other
                                      similar devices (sometimes referred to as{" "}
                                      <span className="block-component" />
                                      'spyware' or 'passive collection
                                      mechanisms' or 'pcms'
                                      <span className="else-block" />
                                      ).
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Interfere with, disrupt, or create an
                                      undue burden on the Services or the
                                      networks or services connected to the
                                      Services.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Harass, annoy, intimidate, or threaten any
                                      of our employees or agents engaged in
                                      providing any portion of the Services to
                                      you.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Attempt to bypass any measures of the
                                      Services designed to prevent or restrict
                                      access to the Services, or any portion of
                                      the Services.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Copy or adapt the Services' software,
                                      including but not limited to Flash, PHP,
                                      HTML, JavaScript, or other code.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Except as permitted by applicable law,
                                      decipher, decompile, disassemble, or
                                      reverse engineer any of the software
                                      comprising or in any way making up a part
                                      of the Services.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Except as may be the result of standard
                                      search engine or Internet browser usage,
                                      use, launch, develop, or distribute any
                                      automated system, including without
                                      limitation, any spider, robot, cheat
                                      utility, scraper, or offline reader that
                                      accesses the Services, or use or launch
                                      any <span className="block-component" />
                                      unauthorised
                                      <span className="else-block" /> script or
                                      other software.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Use a buying agent or purchasing agent to
                                      make purchases on the Services.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Make any{" "}
                                      <span className="block-component" />
                                      unauthorised
                                      <span className="else-block" /> use of the
                                      Services, including collecting usernames
                                      and/or email addresses of users by
                                      electronic or other means for the purpose
                                      of sending unsolicited email, or creating
                                      user accounts by automated means or under
                                      false <span className="block-component" />
                                      pretences
                                      <span className="else-block" />.
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                          <li
                            className="MsoNormal"
                            data-custom-class="body_text"
                            style={{ lineHeight: "1.5", textAlign: "left" }}
                          >
                            <span style={{ fontSize: 15 }}>
                              <span
                                style={{
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontStyle: "normal",
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontWeight: 400,
                                    letterSpacing: "normal",
                                    orphans: 2,
                                    textAlign: "justify",
                                    textIndent: "-29.4px",
                                    textTransform: "none",
                                    whiteSpace: "normal",
                                    widows: 2,
                                    wordSpacing: 0,
                                    WebkitTextStrokeWidth: 0,
                                    backgroundColor: "rgb(255, 255, 255)",
                                    textDecorationStyle: "initial",
                                    textDecorationColor: "initial",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    style={{
                                      lineHeight: "16.8667px",
                                      color: "rgb(89, 89, 89)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                        color: "rgb(89, 89, 89)",
                                      }}
                                    >
                                      Use the Services as part of any effort to
                                      compete with us or otherwise use the
                                      Services and/or the Content for any
                                      revenue-generating{" "}
                                      <span className="block-component" />
                                      endeavour
                                      <span className="else-block" /> or
                                      commercial enterprise.
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "11pt",
                                        lineHeight: "16.8667px",
                                        color: "rgb(89, 89, 89)",
                                        fontFamily: "sans-serif",
                                        fontStyle: "normal",
                                        fontVariantLigatures: "normal",
                                        fontVariantCaps: "normal",
                                        fontWeight: 400,
                                        letterSpacing: "normal",
                                        orphans: 2,
                                        textAlign: "justify",
                                        textIndent: "-29.4px",
                                        textTransform: "none",
                                        whiteSpace: "normal",
                                        widows: 2,
                                        wordSpacing: 0,
                                        WebkitTextStrokeWidth: 0,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        textDecorationStyle: "initial",
                                        textDecorationColor: "initial",
                                      }}
                                    >
                                      <span className="forloop-component" />
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </li>
                        </ul>
                        <div className="MsoNormal">
                          <br />
                        </div>
                        <span
                          className="block-container if"
                          data-type="if"
                          style={{ textAlign: "left" }}
                        >
                          <span data-type="conditional-block">
                            <span data-type="body">
                              <div
                                className="MsoNormal"
                                data-custom-class="heading_1"
                                id="ugc"
                                style={{ lineHeight: "1.5" }}
                              >
                                <strong>
                                  <span
                                    style={{ lineHeight: "1.5", fontSize: 19 }}
                                  >
                                    <h2>8. USER GENERATED CONTRIBUTIONS</h2>
                                  </span>
                                </strong>
                              </div>
                            </span>
                          </span>
                        </span>
                        <span
                          className="block-container if"
                          data-type="if"
                          style={{ textAlign: "left" }}
                        >
                          <span data-type="conditional-block">
                            <span data-type="body">
                              <div
                                className="MsoNormal"
                                data-custom-class="body_text"
                                style={{ lineHeight: "1.5" }}
                              >
                                <span
                                  style={{
                                    fontSize: "11pt",
                                    lineHeight: "16.8667px",
                                    color: "rgb(89, 89, 89)",
                                  }}
                                >
                                  <span
                                    className="block-container if"
                                    data-type="if"
                                    id="24327c5d-a34f-f7e7-88f1-65a2f788484f"
                                    style={{ textAlign: "left" }}
                                  >
                                    <span data-type="conditional-block">
                                      <span
                                        className="block-component"
                                        data-record-question-key="user_post_content_option"
                                        data-type="statement"
                                      />
                                      <span
                                        style={{
                                          fontSize: "11pt",
                                          lineHeight: "16.8667px",
                                          color: "rgb(89, 89, 89)",
                                        }}
                                      >
                                        The Services does not offer users to
                                        submit or post content.
                                        <span className="block-component" /> We
                                        may provide you with the opportunity to
                                        create, submit, post, display, transmit,
                                        perform, publish, distribute, or
                                        broadcast content and materials to us or
                                        on the Services, including but not
                                        limited to text, writings, video, audio,
                                        photographs, graphics, comments,
                                        suggestions, or personal information or
                                        other material (collectively,{" "}
                                        <span className="block-component" />
                                        'Contributions'
                                        <span className="else-block" />
                                        ). Contributions may be viewable by
                                        other users of the Services and through
                                        third-party websites.
                                        <span className="block-component" /> As
                                        such, any Contributions you transmit may
                                        be treated in accordance with the
                                        Services' Privacy Policy.
                                        <span className="statement-end-if-in-editor" />{" "}
                                        When you create or make available any
                                        Contributions, you thereby represent and
                                        warrant that:
                                        <span
                                          style={{
                                            fontSize: "11pt",
                                            lineHeight: "16.8667px",
                                            color: "rgb(89, 89, 89)",
                                          }}
                                        >
                                          <span className="statement-end-if-in-editor">
                                            <span className="block-component" />
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </div>
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div
                      className="MsoNormal"
                      style={{ lineHeight: "17.25px" }}
                    >
                      <ul style={{ fontSize: "medium", textAlign: "left" }}>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                The creation, distribution, transmission, public
                                display, or performance, and the accessing,
                                downloading, or copying of your Contributions do
                                not and will not infringe the proprietary
                                rights, including but not limited to the
                                copyright, patent, trademark, trade secret, or
                                moral rights of any third party.
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                You are the creator and owner of or have the
                                necessary <span className="block-component" />
                                licences
                                <span className="else-block" />, rights,
                                consents, releases, and permissions to use and
                                to <span className="block-component" />
                                authorise
                                <span className="else-block" /> us, the
                                Services, and other users of the Services to use
                                your Contributions in any manner contemplated by
                                the Services and these Legal Terms.
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                You have the written consent, release, and/or
                                permission of each and every identifiable
                                individual person in your Contributions to use
                                the name or likeness of each and every such
                                identifiable individual person to enable
                                inclusion and use of your Contributions in any
                                manner contemplated by the Services and these
                                Legal Terms.
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                Your Contributions are not false, inaccurate, or
                                misleading.
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                Your Contributions are not unsolicited or{" "}
                                <span className="block-component" />
                                unauthorised
                                <span className="else-block" /> advertising,
                                promotional materials, pyramid schemes, chain
                                letters, spam, mass mailings, or other forms of
                                solicitation.
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                Your Contributions are not obscene, lewd,
                                lascivious, filthy, violent, harassing,{" "}
                                <span className="block-component" />
                                libellous
                                <span className="else-block" />, slanderous, or
                                otherwise objectionable (as determined by us).
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                Your Contributions do not ridicule, mock,
                                disparage, intimidate, or abuse anyone.
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                Your Contributions are not used to harass or
                                threaten (in the legal sense of those terms) any
                                other person and to promote violence against a
                                specific person or class of people.
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                Your Contributions do not violate any applicable
                                law, regulation, or rule.
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                Your Contributions do not violate the privacy or
                                publicity rights of any third party.
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                Your Contributions do not violate any applicable
                                law concerning child pornography, or otherwise
                                intended to protect the health or well-being of
                                minors.
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                Your Contributions do not include any offensive
                                comments that are connected to race, national
                                origin, gender, sexual preference, or physical
                                handicap.
                              </span>
                            </span>
                          </span>
                        </li>
                        <li
                          data-custom-class="body_text"
                          style={{ lineHeight: "1.5" }}
                        >
                          <span style={{ color: "rgb(89, 89, 89)" }}>
                            <span style={{ fontSize: 14 }}>
                              <span data-custom-class="body_text">
                                Your Contributions do not otherwise violate, or
                                link to material that violates, any provision of
                                these Legal Terms, or any applicable law or
                                regulation.
                              </span>
                            </span>
                          </span>
                        </li>
                      </ul>
                      <span
                        className="block-container if"
                        data-type="if"
                        style={{ textAlign: "left" }}
                      >
                        <span data-type="conditional-block">
                          <span data-type="body">
                            <div
                              className="MsoNormal"
                              data-custom-class="body_text"
                              style={{ lineHeight: "1.5" }}
                            >
                              <span
                                style={{
                                  fontSize: "11pt",
                                  lineHeight: "16.8667px",
                                  color: "rgb(89, 89, 89)",
                                }}
                              >
                                Any use of the Services in violation of the
                                foregoing violates these Legal Terms and may
                                result in, among other things, termination or
                                suspension of your rights to use the Services.
                              </span>
                            </div>
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    style={{ textAlign: "justify", lineHeight: 1 }}
                  >
                    <span
                      className="block-container if"
                      data-type="if"
                      style={{ textAlign: "left" }}
                    >
                      <span data-type="conditional-block">
                        <span data-type="body">
                          <div
                            className="MsoNormal"
                            data-custom-class="heading_1"
                            id="license"
                            style={{ lineHeight: "1.5" }}
                          >
                            <strong>
                              <span style={{ lineHeight: "1.5", fontSize: 19 }}>
                                <h2>
                                  9. CONTRIBUTION{" "}
                                  <span className="block-component" />
                                  LICENCE
                                  <span className="else-block" />
                                </h2>
                              </span>
                            </strong>
                          </div>
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: 1 }}>
                    <span
                      className="block-container if"
                      data-type="if"
                      id="a088ddfb-d8c1-9e58-6f21-958c3f4f0709"
                      style={{ textAlign: "left" }}
                    >
                      <span data-type="conditional-block">
                        <span
                          className="block-component"
                          data-record-question-key="user_post_content_option"
                          data-type="statement"
                        />
                      </span>
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11pt",
                        lineHeight: "16.8667px",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11pt",
                          lineHeight: "16.8667px",
                          color: "rgb(89, 89, 89)",
                        }}
                      >
                        You and Services agree that we may access, store,
                        process, and use any information and personal data that
                        you provide
                        <span className="block-component" /> following the terms
                        of the Privacy Policy
                        <span className="statement-end-if-in-editor" /> and your
                        choices (including settings).
                      </span>
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11pt",
                        lineHeight: "16.8667px",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      By submitting suggestions or other feedback regarding the
                      Services, you agree that we can use and share such
                      feedback for any purpose without compensation to you.
                      <span className="block-component" />
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11pt",
                        lineHeight: "16.8667px",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      We do not assert any ownership over your Contributions.
                      You retain full ownership of all of your Contributions and
                      any intellectual property rights or other proprietary
                      rights associated with your Contributions. We are not
                      liable for any statements or representations in your
                      Contributions provided by you in any area on the Services.
                      You are solely responsible for your Contributions to the
                      Services and you expressly agree to exonerate us from any
                      and all responsibility and to refrain from any legal
                      action against us regarding your Contributions.
                      <span className="statement-end-if-in-editor" />
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <br />
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      style={{
                        fontSize: "11pt",
                        lineHeight: "16.8667px",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11pt",
                          lineHeight: "16.8667px",
                          color: "rgb(89, 89, 89)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11pt",
                            lineHeight: "16.8667px",
                            color: "rgb(89, 89, 89)",
                          }}
                        >
                          <span
                            className="block-container if"
                            data-type="if"
                            style={{ textAlign: "left" }}
                          >
                            <span
                              className="statement-end-if-in-editor"
                              data-type="close"
                            />
                          </span>
                        </span>
                      </span>
                    </span>
                  </div>
                  <div
                    className="MsoNormal"
                    data-custom-class="body_text"
                    style={{ lineHeight: "1.5" }}
                  >
                    <span
                      className="block-container if"
                      data-type="if"
                      style={{ textAlign: "left" }}
                    >
                      <span data-type="conditional-block">
                        <span
                          className="block-component"
                          data-record-question-key="review_option"
                          data-type="statement"
                        />
                      </span>
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span
                      className="block-container if"
                      data-type="if"
                      style={{ textAlign: "left" }}
                    >
                      <span data-type="conditional-block">
                        <span
                          className="block-component"
                          data-record-question-key="mobile_app_option"
                          data-type="statement"
                        />
                      </span>
                    </span>
                  </div>
                  <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                    <span
                      className="block-container if"
                      data-type="if"
                      style={{ textAlign: "left" }}
                    >
                      <span data-type="conditional-block">
                        <span
                          className="block-component"
                          data-record-question-key="socialnetwork_link_option"
                          data-type="statement"
                        />
                      </span>
                    </span>
                  </div>
                  <span
                    className="block-container if"
                    data-type="if"
                    style={{ textAlign: "left" }}
                  >
                    <span data-type="conditional-block">
                      <span
                        className="block-component"
                        data-record-question-key="3rd_party_option"
                        data-type="statement"
                      />
                    </span>
                  </span>
                </div>
                <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                  <span
                    className="block-container if"
                    data-type="if"
                    style={{ textAlign: "left" }}
                  >
                    <span data-type="conditional-block">
                      <span
                        className="block-component"
                        data-record-question-key="advertiser_option"
                        data-type="statement"
                      />
                    </span>
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="sitemanage"
                  style={{ lineHeight: "1.5" }}
                >
                  <strong>
                    <span style={{ lineHeight: "1.5", fontSize: 19 }}>
                      <h2>10. SERVICES MANAGEMENT</h2>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5" }}
                >
                  We reserve the right, but not the obligation, to: (1) monitor
                  the Services for violations of these Legal Terms; (2) take
                  appropriate legal action against anyone who, in our sole
                  discretion, violates the law or these Legal Terms, including
                  without limitation, reporting such user to law enforcement
                  authorities; (3) in our sole discretion and without
                  limitation, refuse, restrict access to, limit the availability
                  of, or disable (to the extent technologically feasible) any of
                  your Contributions or any portion thereof; (4) in our sole
                  discretion and without limitation, notice, or liability, to
                  remove from the Services or otherwise disable all files and
                  content that are excessive in size or are in any way
                  burdensome to our systems; and (5) otherwise manage the
                  Services in a manner designed to protect our rights and
                  property and to facilitate the proper functioning of the
                  Services.
                </div>
                <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                  <br />
                </div>
                <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                  <span
                    className="block-container if"
                    data-type="if"
                    style={{ textAlign: "left" }}
                  >
                    <span data-type="conditional-block">
                      <span
                        className="block-component"
                        data-record-question-key="privacy_policy_option"
                        data-type="statement"
                      />
                    </span>
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="ppyes"
                  style={{ lineHeight: "1.5" }}
                >
                  <strong>
                    <h2>11. PRIVACY POLICY</h2>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5" }}
                >
                  <span
                    style={{
                      fontSize: "11pt",
                      lineHeight: "16.8667px",
                      color: "rgb(89, 89, 89)",
                    }}
                  >
                    We care about data privacy and security. Please review our
                    Privacy Policy:
                    <strong>
                      &nbsp;
                      <span style={{ color: "rgb(0, 58, 250)" }}>
                        <span
                          className="block-container question question-in-editor"
                          data-id="d10c7fd7-0685-12ac-c717-cbc45ff916d1"
                          data-type="question"
                        >
                          <a
                            href="https://taskpilot.xyz/privacy"
                            target="_blank"
                            data-custom-class="link"
                          >
                            https://taskpilot.xyz/privacy
                          </a>
                        </span>
                      </span>
                    </strong>
                    . By using the Services, you agree to be bound by our
                    Privacy Policy, which is incorporated into these Legal
                    Terms. Please be advised the Services are hosted in{" "}
                    <span className="block-component" />
                    <span className="question">India</span>
                    <span className="statement-end-if-in-editor" />
                    <span className="block-component" />. If you access the
                    Services from any other region of the world with laws or
                    other requirements governing personal data collection, use,
                    or disclosure that differ from applicable laws in{" "}
                    <span
                      style={{
                        fontSize: "11pt",
                        lineHeight: "16.8667px",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      <span className="block-component" />
                      <span className="question">India</span>
                      <span className="statement-end-if-in-editor" />
                    </span>
                    <span className="block-component" />, then through your
                    continued use of the Services, you are transferring your
                    data to{" "}
                    <span
                      style={{
                        fontSize: "11pt",
                        lineHeight: "16.8667px",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      <span className="block-component" />
                      <span className="question">India</span>
                      <span className="statement-end-if-in-editor" />
                    </span>
                    <span className="block-component" />, and you expressly
                    consent to have your data transferred to and processed in{" "}
                    <span
                      style={{
                        fontSize: "11pt",
                        lineHeight: "16.8667px",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      <span className="block-component" />
                      <span className="question">India</span>
                      <span className="statement-end-if-in-editor" />
                    </span>
                    <span className="block-component" />.
                    <span className="block-component" />
                  </span>
                </div>
                <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                  <br />
                </div>
                <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                  <span
                    className="block-container if"
                    data-type="if"
                    style={{ textAlign: "left" }}
                  >
                    <span
                      className="statement-end-if-in-editor"
                      data-type="close"
                    />
                  </span>
                  <span className="block-container if" data-type="if">
                    <span data-type="conditional-block">
                      <span
                        className="block-component"
                        data-record-question-key="privacy_policy_followup"
                        data-type="statement"
                        style={{ fontSize: "14.6667px" }}
                      />
                    </span>
                  </span>
                </div>
                <div className="MsoNormal" style={{ lineHeight: "1.5" }}>
                  <span
                    className="block-container if"
                    data-type="if"
                    style={{ textAlign: "left" }}
                  >
                    <span data-type="conditional-block">
                      <span
                        className="block-component"
                        data-record-question-key="copyright_agent_option"
                        data-type="statement"
                      >
                        <span className="block-component" />
                      </span>
                    </span>
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span className="block-component" />
                  <span className="block-component" />
                  <span className="statement-end-if-in-editor" />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="terms"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span style={{ lineHeight: "1.5", fontSize: 19 }}>
                      <h2>12. TERM AND TERMINATION</h2>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11pt",
                      lineHeight: "16.8667px",
                      color: "rgb(89, 89, 89)",
                    }}
                  >
                    These Legal Terms shall remain in full force and effect
                    while you use the Services. WITHOUT LIMITING ANY OTHER
                    PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN
                    OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY
                    ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING
                    CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR
                    NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY
                    REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE
                    LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY
                    TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR
                    DELETE{" "}
                    <span
                      className="block-container if"
                      data-type="if"
                      id="a6e121c2-36b4-5066-bf9f-a0a33512e768"
                    >
                      <span data-type="conditional-block">
                        <span
                          className="block-component"
                          data-record-question-key="user_account_option"
                          data-type="statement"
                        />
                        <span data-type="body">YOUR ACCOUNT AND&nbsp;</span>
                      </span>
                      <span
                        className="statement-end-if-in-editor"
                        data-type="close"
                      />
                    </span>
                    ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME,
                    WITHOUT WARNING, IN OUR SOLE DISCRETION.
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11pt",
                      lineHeight: "16.8667px",
                      color: "rgb(89, 89, 89)",
                    }}
                  >
                    If we terminate or suspend your account for any reason, you
                    are prohibited from registering and creating a new account
                    under your name, a fake or borrowed name, or the name of any
                    third party, even if you may be acting on behalf of the
                    third party. In addition to terminating or suspending your
                    account, we reserve the right to take appropriate legal
                    action, including without limitation pursuing civil,
                    criminal, and injunctive redress.
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="modifications"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span style={{ lineHeight: "1.5", fontSize: 19 }}>
                      <h2>13. MODIFICATIONS AND INTERRUPTIONS</h2>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11pt",
                      lineHeight: "16.8667px",
                      color: "rgb(89, 89, 89)",
                    }}
                  >
                    We reserve the right to change, modify, or remove the
                    contents of the Services at any time or for any reason at
                    our sole discretion without notice. However, we have no
                    obligation to update any information on our Services.
                    <span className="block-component" /> We will not be liable
                    to you or any third party for any modification, price
                    change, suspension, or discontinuance of the Services.
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11pt",
                      lineHeight: "16.8667px",
                      color: "rgb(89, 89, 89)",
                    }}
                  >
                    We cannot guarantee the Services will be available at all
                    times. We may experience hardware, software, or other
                    problems or need to perform maintenance related to the
                    Services, resulting in interruptions, delays, or errors. We
                    reserve the right to change, revise, update, suspend,
                    discontinue, or otherwise modify the Services at any time or
                    for any reason without notice to you. You agree that we have
                    no liability whatsoever for any loss, damage, or
                    inconvenience caused by your inability to access or use the
                    Services during any downtime or discontinuance of the
                    Services. Nothing in these Legal Terms will be construed to
                    obligate us to maintain and support the Services or to
                    supply any corrections, updates, or releases in connection
                    therewith.
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="law"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span style={{ lineHeight: "1.5", fontSize: 19 }}>
                      <h2>14. GOVERNING LAW</h2>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11pt",
                      lineHeight: "16.8667px",
                      color: "rgb(89, 89, 89)",
                    }}
                  >
                    <span className="block-component" />
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11pt",
                      lineHeight: "16.8667px",
                      color: "rgb(89, 89, 89)",
                    }}
                  >
                    These Legal Terms shall be governed by and defined following
                    the laws of <span className="block-component" />
                    <span className="question">India</span>
                    <span
                      style={{
                        fontSize: "11pt",
                        lineHeight: "16.8667px",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      <span className="statement-end-if-in-editor" />
                    </span>
                    . <span className="question">Taskpilot Labs</span> and
                    yourself irrevocably consent that the courts of{" "}
                    <span
                      style={{
                        fontSize: "11pt",
                        lineHeight: "16.8667px",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      <span className="block-component" />
                      <span className="question">India</span>
                      <span
                        style={{
                          fontSize: "11pt",
                          lineHeight: "16.8667px",
                          color: "rgb(89, 89, 89)",
                        }}
                      >
                        <span className="statement-end-if-in-editor" />
                      </span>
                    </span>{" "}
                    shall have exclusive jurisdiction to resolve any dispute
                    which may arise in connection with these Legal Terms.
                    <span className="statement-end-if-in-editor" />
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="disputes"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span style={{ lineHeight: "1.5", fontSize: 19 }}>
                      <h2>15. DISPUTE RESOLUTION</h2>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span className="block-component" />
                  <span className="block-component" />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span style={{ fontSize: 15 }}>
                    You agree to irrevocably submit all disputes related to
                    these Legal Terms or the legal relationship established by
                    these Legal Terms to the jurisdiction of the{" "}
                    <span className="block-component" />
                    <span className="question">India</span>
                    <span className="statement-end-if-in-editor" /> courts.{" "}
                    <span className="question">Taskpilot Labs</span> shall also
                    maintain the right to bring proceedings as to the substance
                    of the matter in the courts of the country where you reside
                    or, if these Legal Terms are entered into in the course of
                    your trade or profession, the state of your principal place
                    of business.
                  </span>
                  <span className="statement-end-if-in-editor">
                    <span style={{ fontSize: 15 }} />
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span className="statement-end-if-in-editor">
                    <span className="else-block" />
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="corrections"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span style={{ fontSize: 19, lineHeight: "1.5" }}>
                      <h2>16. CORRECTIONS</h2>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  There may be information on the Services that contains
                  typographical errors, inaccuracies, or omissions, including
                  descriptions, pricing, availability, and various other
                  information. We reserve the right to correct any errors,
                  inaccuracies, or omissions and to change or update the
                  information on the Services at any time, without prior notice.
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="disclaimer"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: 19,
                      lineHeight: "1.5",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    <strong>
                      <h2>17. DISCLAIMER</h2>
                    </strong>
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11.0pt",
                      lineHeight: "115%",
                      fontFamily: "Arial",
                      color: "#595959",
                    }}
                  >
                    THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE
                    BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT
                    YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE
                    DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION
                    WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT
                    LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE
                    MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
                    COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY
                    WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND
                    WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1)
                    ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS,
                    (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE
                    WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
                    SERVICES, (3) ANY <span className="block-component" />
                    UNAUTHORISED
                    <span className="else-block" /> ACCESS TO OR USE OF OUR
                    SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
                    AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY
                    INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE
                    SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE
                    WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY
                    THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY
                    CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND
                    INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED,
                    TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES.
                    WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
                    RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR
                    OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY
                    HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION
                    FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT
                    BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING
                    ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF
                    PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR
                    SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD
                    USE YOUR BEST <span className="block-component" />
                    JUDGEMENT
                    <span className="else-block" /> AND EXERCISE CAUTION WHERE
                    APPROPRIATE.
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="liability"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span
                      style={{
                        lineHeight: "1.5",
                        fontFamily: "Arial",
                        fontSize: 19,
                      }}
                    >
                      <h2>18. LIMITATIONS OF LIABILITY</h2>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11.0pt",
                      lineHeight: "115%",
                      fontFamily: "Arial",
                      color: "#595959",
                    }}
                  >
                    <span data-custom-class="body_text">
                      IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS
                      BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
                      INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL,
                      OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE,
                      LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF
                      THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE
                      POSSIBILITY OF SUCH DAMAGES.
                    </span>{" "}
                    <span
                      className="block-container if"
                      data-type="if"
                      id="3c3071ce-c603-4812-b8ca-ac40b91b9943"
                    >
                      <span data-custom-class="body_text">
                        <span data-type="conditional-block">
                          <span
                            className="block-component"
                            data-record-question-key="limitations_liability_option"
                            data-type="statement"
                          />
                          <span data-type="body">
                            NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED
                            HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE
                            WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION,
                            WILL AT ALL TIMES BE LIMITED TO{" "}
                            <span
                              className="block-container if"
                              data-type="if"
                              id="73189d93-ed3a-d597-3efc-15956fa8e04e"
                            >
                              <span data-type="conditional-block">
                                <span
                                  className="block-component"
                                  data-record-question-key="limitations_liability_option"
                                  data-type="statement"
                                />
                                <span data-type="body">
                                  THE LESSER OF THE AMOUNT PAID, IF ANY, BY YOU
                                  TO US
                                  <span data-type="conditional-block">
                                    <span
                                      className="block-component"
                                      data-record-question-key="limilation_liability_time_option"
                                      data-type="statement"
                                    />{" "}
                                    OR <span className="block-component" />
                                    <span className="block-component" />
                                  </span>
                                </span>
                              </span>
                              <span
                                style={{
                                  fontSize: "11.0pt",
                                  lineHeight: "115%",
                                  fontFamily: "Arial",
                                  color: "#595959",
                                }}
                              >
                                <span
                                  className="block-container if"
                                  data-type="if"
                                  id="3c3071ce-c603-4812-b8ca-ac40b91b9943"
                                >
                                  <span
                                    className="statement-end-if-in-editor"
                                    data-type="close"
                                  >
                                    <span data-custom-class="body_text">.</span>
                                  </span>
                                </span>
                                &nbsp;
                              </span>
                              <span data-custom-class="body_text">
                                CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO
                                NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR
                                THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES.
                                IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE
                                ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY
                                TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span
                        className="statement-end-if-in-editor"
                        data-type="close"
                      >
                        <span data-custom-class="body_text" />
                      </span>
                    </span>
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="indemnification"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span
                      style={{
                        lineHeight: "1.5",
                        fontFamily: "Arial",
                        fontSize: 19,
                      }}
                    >
                      <h2>19. INDEMNIFICATION</h2>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11.0pt",
                      lineHeight: "115%",
                      fontFamily: "Arial",
                      color: "#595959",
                    }}
                  >
                    You agree to defend, indemnify, and hold us harmless,
                    including our subsidiaries, affiliates, and all of our
                    respective officers, agents, partners, and employees, from
                    and against any loss, damage, liability, claim, or demand,
                    including reasonable attorneys’ fees and expenses, made by
                    any third party due to or arising out of:{" "}
                    <span
                      className="block-container if"
                      data-type="if"
                      id="475fffa5-05ca-def8-ac88-f426b238903c"
                    >
                      <span data-type="conditional-block">
                        <span
                          className="block-component"
                          data-record-question-key="user_post_content_option"
                          data-type="statement"
                        />
                      </span>
                      (<span style={{ fontSize: "14.6667px" }}>1</span>) use of
                      the Services; (
                      <span style={{ fontSize: "14.6667px" }}>2</span>) breach
                      of these Legal Terms; (
                      <span style={{ fontSize: "14.6667px" }}>3</span>) any
                      breach of your representations and warranties set forth in
                      these Legal Terms; (
                      <span style={{ fontSize: "14.6667px" }}>4</span>) your
                      violation of the rights of a third party, including but
                      not limited to intellectual property rights; or (
                      <span style={{ fontSize: "14.6667px" }}>5</span>) any
                      overt harmful act toward any other user of the Services
                      with whom you connected via the Services. Notwithstanding
                      the foregoing, we reserve the right, at your expense, to
                      assume the exclusive <span className="block-component" />
                      defence
                      <span className="else-block" /> and control of any matter
                      for which you are required to indemnify us, and you agree
                      to cooperate, at your expense, with our{" "}
                      <span className="block-component" />
                      defence
                      <span className="else-block" /> of such claims. We will
                      use reasonable efforts to notify you of any such claim,
                      action, or proceeding which is subject to this
                      indemnification upon becoming aware of it.
                    </span>
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="userdata"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span
                      style={{
                        lineHeight: "1.5",
                        fontFamily: "Arial",
                        fontSize: 19,
                      }}
                    >
                      <h2>20. USER DATA</h2>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11.0pt",
                      lineHeight: "115%",
                      fontFamily: "Arial",
                      color: "#595959",
                    }}
                  >
                    We will maintain certain data that you transmit to the
                    Services for the purpose of managing the performance of the
                    Services, as well as data relating to your use of the
                    Services. Although we perform regular routine backups of
                    data, you are solely responsible for all data that you
                    transmit or that relates to any activity you have undertaken
                    using the Services. You agree that we shall have no
                    liability to you for any loss or corruption of any such
                    data, and you hereby waive any right of action against us
                    arising from any such loss or corruption of such data.
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="electronic"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span
                      style={{
                        lineHeight: "1.5",
                        fontFamily: "Arial",
                        fontSize: 19,
                      }}
                    >
                      <h2>
                        21. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND
                        SIGNATURES
                      </h2>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11.0pt",
                      lineHeight: "115%",
                      fontFamily: "Arial",
                      color: "#595959",
                    }}
                  >
                    Visiting the Services, sending us emails, and completing
                    online forms constitute electronic communications. You
                    consent to receive electronic communications, and you agree
                    that all agreements, notices, disclosures, and other
                    communications we provide to you electronically, via email
                    and on the Services, satisfy any legal requirement that such
                    communication be in writing. YOU HEREBY AGREE TO THE USE OF
                    ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS,
                    AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS
                    OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE
                    SERVICES. You hereby waive any rights or requirements under
                    any statutes, regulations, rules, ordinances, or other laws
                    in any jurisdiction which require an original signature or
                    delivery or retention of non-electronic records, or to
                    payments or the granting of credits by any means other than
                    electronic means.
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span className="block-component">
                    <span style={{ fontSize: 15 }} />
                  </span>
                  <span className="block-component" />
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="misc"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span
                      style={{
                        lineHeight: "1.5",
                        fontFamily: "Arial",
                        fontSize: 19,
                      }}
                    >
                      <h2>22. MISCELLANEOUS</h2>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11.0pt",
                      lineHeight: "115%",
                      fontFamily: "Arial",
                      color: "#595959",
                    }}
                  >
                    These Legal Terms and any policies or operating rules posted
                    by us on the Services or in respect to the Services
                    constitute the entire agreement and understanding between
                    you and us. Our failure to exercise or enforce any right or
                    provision of these Legal Terms shall not operate as a waiver
                    of such right or provision. These Legal Terms operate to the
                    fullest extent permissible by law. We may assign any or all
                    of our rights and obligations to others at any time. We
                    shall not be responsible or liable for any loss, damage,
                    delay, or failure to act caused by any cause beyond our
                    reasonable control. If any provision or part of a provision
                    of these Legal Terms is determined to be unlawful, void, or
                    unenforceable, that provision or part of the provision is
                    deemed severable from these Legal Terms and does not affect
                    the validity and enforceability of any remaining provisions.
                    There is no joint venture, partnership, employment or agency
                    relationship created between you and us as a result of these
                    Legal Terms or use of the Services. You agree that these
                    Legal Terms will not be construed against us by virtue of
                    having drafted them. You hereby waive any and all{" "}
                    <span className="block-component" />
                    defences
                    <span className="else-block" /> you may have based on the
                    electronic form of these Legal Terms and the lack of signing
                    by the parties hereto to execute these Legal Terms.
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span className="block-component">
                    <span style={{ fontSize: 15 }} />
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="heading_1"
                  id="contact"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span style={{ lineHeight: "115%", fontFamily: "Arial" }}>
                      <span style={{ fontSize: 19, lineHeight: "1.5" }}>
                        <h2>23. CONTACT US</h2>
                      </span>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span
                    style={{
                      fontSize: "11.0pt",
                      lineHeight: "115%",
                      fontFamily: "Arial",
                      color: "#595959",
                    }}
                  >
                    In order to resolve a complaint regarding the Services or to
                    receive further information regarding use of the Services,
                    please contact us at:
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <br />
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span style={{ fontSize: 15 }}>
                    <span style={{ color: "rgb(89, 89, 89)" }}>
                      <span className="question">
                        <strong>Taskpilot Labs</strong>
                      </span>
                      <strong>
                        <span className="block-component" />
                      </strong>
                    </span>
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span style={{ fontSize: 15 }}>
                    <span
                      style={{
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      <span className="question">
                        <strong>
                          <span className="question">
                            Shilp Complex, Sama-Savli Rd,{" "}
                          </span>
                        </strong>
                      </span>
                      <span
                        style={{
                          lineHeight: "115%",
                          fontFamily: "Arial",
                          color: "rgb(89, 89, 89)",
                        }}
                      >
                        <span className="statement-end-if-in-editor" />
                      </span>
                      <span className="block-component" />
                    </span>
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span style={{ fontSize: 15 }}>
                    <span
                      style={{
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "rgb(89, 89, 89)",
                      }}
                    >
                      <span className="question">
                        <strong>
                          Raghuvir Nagar, Kasturba Nagar, New Sama, Vadodara,
                          Gujarat
                        </strong>
                      </span>
                      <span
                        style={{
                          lineHeight: "115%",
                          fontFamily: "Arial",
                          color: "rgb(89, 89, 89)",
                        }}
                      >
                        <span
                          style={{
                            lineHeight: "115%",
                            fontFamily: "Arial",
                            color: "rgb(89, 89, 89)",
                          }}
                        >
                          <span className="statement-end-if-in-editor" />
                        </span>
                      </span>
                    </span>
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span style={{ fontSize: 15 }}>
                    <strong>
                      <span style={{ color: "rgb(89, 89, 89)" }}>
                        <span className="question">
                          <span className="block-component" />
                          <span className="question">Vadodara</span>
                          <span className="statement-end-if-in-editor" />
                        </span>
                        <span className="block-component" />,{" "}
                        <span className="question">Gujarat</span>
                        <span className="statement-end-if-in-editor" />
                        <span className="block-component" />{" "}
                        <span className="question">390024</span>
                        <span className="statement-end-if-in-editor" />
                      </span>
                    </strong>
                    <strong>
                      <span style={{ color: "rgb(89, 89, 89)" }}>
                        <span className="block-component" />
                      </span>
                      <span className="block-component" />
                    </strong>
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <span className="block-component">
                    <strong />
                  </span>
                  <strong>
                    <span className="question">India</span>
                  </strong>
                  <span className="statement-end-if-in-editor" />
                  <span className="statement-end-if-in-editor" />
                  <span className="statement-end-if-in-editor">
                    <strong />
                  </span>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      <strong>
                        <span className="block-component" />
                        Phone: <span className="question">9714356313</span>
                        <span className="statement-end-if-in-editor" />
                      </strong>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      <strong>
                        <span className="block-component" />
                      </strong>
                    </span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-custom-class="body_text"
                  style={{ lineHeight: "1.5", textAlign: "left" }}
                >
                  <strong>
                    <span
                      style={{
                        fontSize: "11.0pt",
                        lineHeight: "115%",
                        fontFamily: "Arial",
                        color: "#595959",
                      }}
                    >
                      <strong>
                        <span className="question">
                          <span className="block-component" />
                          <span className="question">
                            contact.taskpilot@gmail.com
                          </span>
                          <span className="statement-end-if-in-editor" />
                        </span>
                      </strong>
                    </span>
                  </strong>
                </div>
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n      ul {\n        list-style-type: square;\n      }\n      ul > li > ul {\n        list-style-type: circle;\n      }\n      ul > li > ul > li > ul {\n        list-style-type: square;\n      }\n      ol li {\n        font-family: Arial ;\n      }\n    ",
                }}
              />
            </>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TaskPilot Labs. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

