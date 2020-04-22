import React from "react";
import { Accordion, Button, Card, Container } from "react-bootstrap";

const Symptoms = () => {
  return (
    <Container
      className="symptoms fadeInUp"
      style={{ animationDuration: "2s" }}
    >
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <center>
              <strong>COVID-19 Symptoms</strong>
            </center>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              Coronavirus disease (COVID-19) is an infectious disease caused by
              a newly discovered coronavirus. <br></br>
              <br></br>
              Most people infected with the COVID-19 virus will experience mild
              to moderate respiratory illness and recover without requiring
              special treatment. Older people, and those with underlying medical
              problems like cardiovascular disease, diabetes, chronic
              respiratory disease, and cancer are more likely to develop serious
              illness.<br></br>
              <br></br>
              <strong>
                The best way to prevent and slow down transmission
              </strong>{" "}
              is be well informed about the COVID-19 virus, the disease it
              causes and how it spreads. Protect yourself and others from
              infection by{" "}
              <strong>
                washing your hands or using an alcohol based rub frequently
              </strong>{" "}
              and <strong>not touching your face.</strong>
              <br></br>
              <br></br>People may be sick with the virus for 1 to 14 days before
              developing symptoms.
              <p>
                The most common symptoms of coronavirus disease (COVID-19) are:
              </p>
              <ul>
                <li>
                  <strong>fever</strong>
                </li>
                <li>
                  <strong>dry cough</strong>
                </li>
                <li>
                  <strong>tiredness</strong>
                </li>
                <li>
                  <strong>difficulty breathing (severe cases)</strong>
                </li>
              </ul>
              <p>The COVID-19 virus spreads primarily through:</p>
              <ul>
                <li>
                  <strong>droplets of saliva</strong>
                </li>
                <li>
                  <strong>
                    discharge from the nose when an infected person coughs or
                    sneezes
                  </strong>
                </li>
              </ul>
              so it’s important that you also practice respiratory etiquette
              (for example, by coughing into a flexed elbow). Most people (about
              80%) recover from the disease without needing special treatment.
              <br></br>
              <br></br>
              More rarely, the disease can be serious and even fatal. Older
              people, and people with other medical conditions (such as asthma,
              diabetes, or heart disease), may be more vulnerable to becoming
              severely ill.<br></br>
              <br></br>
              <Button
                variant="outline-info"
                href="https://www.who.int/health-topics/coronavirus#tab=tab_1"
              >
                Click here to learn more
              </Button>
              <br></br>
              <br></br>You can relieve your symptoms if you: <br></br>
              <ul>
                <li>rest and sleep</li>
                <li>keep warm</li>
                <li>drink plenty of liquids</li>
                <li>
                  use a room humidifier or take a hot shower to help ease a sore
                  throat and cough
                </li>
              </ul>
              If you develop a fever, cough, and have difficulty breathing,
              promptly seek medical care. Call in advance and tell your health
              provider of any recent travel or recent contact with travelers.
              <br></br>
              <br></br>
              <Button
                variant="outline-danger"
                href="https://www.who.int/news-room/q-a-detail/q-a-coronaviruses#:~:text=protect"
              >
                Click here to learn more
              </Button>
              <br></br>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <br></br>
    </Container>
  );
};

export default Symptoms;
