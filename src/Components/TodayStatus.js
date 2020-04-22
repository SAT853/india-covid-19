import React, { useState, useEffect, memo } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const TodayStatus = (props) => {
  const [todayCases, settodayCases] = useState(null);
  const [todayRecovered, settodayRecovered] = useState(null);
  const [lastUpdate, setlastUpdate] = useState(null);

  useEffect(() => {
    settodayCases(props.dailyData[0].todayCases);
    setlastUpdate(props.dailyData[0].lastupdate);
    settodayRecovered(props.dailyData[0].todayRecovered);
    return () => {};
  }, [props.dailyData]);

  return (
    todayCases && (
      <Container className="today-alert">
        <Alert variant="info">
          <Alert.Heading>Today's COVID-19 Report</Alert.Heading>
          <div>
            <p>
              As per Datasource Lastupdate: <strong>{lastUpdate}</strong>. In
              India, total reported corona cases today is{" "}
              <strong>{todayCases}</strong> total recovered cases today is{" "}
              <strong>{todayRecovered}</strong>. Fighting COVID-19 is need of
              the hour. Donate to{" "}
              <a
                href="https://pib.gov.in/PressReleseDetailm.aspx?PRID=1608851"
                target="_blank"
                rel="noopener noreferrer"
              >
                PM Relief{" "}
              </a>{" "}
              Fund now and make a difference.
            </p>
            <div className="google-pay">
              <Button href={"https://gpay.app.goo.gl/277dRg"} variant="primary">
                <FontAwesomeIcon icon={faGoogle} /> Donate Now
              </Button>
            </div>
          </div>
        </Alert>
      </Container>
    )
  );
};

export default memo(TodayStatus);
