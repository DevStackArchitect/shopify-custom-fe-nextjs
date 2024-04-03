import React from 'react';
import styles from "@/styles/PrivacyPolicy.module.scss";
import Container from "@/components/Shared/Container";

const FAQPage = () => {
    return (
        <div className={styles.wrapper}>
            <Container>
                <h1>FAQs</h1>
                <div className={styles.cardGrid}>

                    <div className={styles.cardContent}>
                        <h2>What planets have we explored?</h2>
                        <p>
                            Our missions have successfully orbited and landed on Mars, the Moon, and recently, Venus. Each mission aims to collect valuable data for scientific research, understand the planetary environment, and test the viability of interplanetary living.
                        </p>
                    </div>

                    <div className={styles.cardContent}>
                        <h2>How can I become an astronaut with your company?</h2>
                        <p>
                            We're always looking for passionate individuals to join our team. Candidates must have a STEM degree and at least three years of related professional experience. Exceptional physical and mental health, along with a strong teamwork mentality, are crucial. Details on applying can be found on our 'Careers' page.
                        </p>
                    </div>

                    <div className={styles.cardContent}>
                        <h2>Can civilians participate in space travel?</h2>
                        <p>
                            Yes! We offer civilian space travel programs that range from suborbital flights to orbiting Earth. Participants go through rigorous health checks and training sessions to ensure they're fully prepared for the journey.
                        </p>
                    </div>

                    <div className={styles.cardContent}>
                        <h2>What is the cost of a space travel ticket?</h2>
                        <p>
                            Prices vary depending on the destination. Suborbital flights start at $250,000, while orbital flights are significantly higher due to the extended duration and resources required. Please contact our sales team for more detailed pricing.
                        </p>
                    </div>

                    <div className={styles.cardContent}>
                        <h2>Are there any long-term plans for Mars colonization?</h2>
                        <p>
                            Absolutely. We are in the early stages of planning sustainable human colonies on Mars. This includes research into habitable living structures, renewable resources, and terraforming efforts. Our goal is to make Mars a second home for humanity.
                        </p>
                    </div>

                    <div className={styles.cardContent}>
                        <h2>What happens if there is an emergency during the flight?</h2>
                        <p>
                            Safety is our top priority. All spacecraft are equipped with life-support systems and emergency return vehicles. Our crew is extensively trained to handle various emergency scenarios to ensure the safety and well-being of all passengers.
                        </p>
                    </div>

                    <div className={styles.cardContent}>
                        <h2>How does zero gravity affect the human body?</h2>
                        <p>
                            Zero gravity can lead to muscle atrophy and bone density loss. However, our spacecraft are equipped with facilities to help mitigate these effects through regular exercise. Astronauts also undergo health monitoring before, during, and after the mission.
                        </p>
                    </div>

                    <div className={styles.cardContent}>
                        <h2>What are your sustainability practices in space?</h2>
                        <p>
                            We are committed to preserving the space environment. Our missions are designed to minimize space debris, and we are actively participating in international efforts to develop guidelines for the responsible use of outer space.
                        </p>
                    </div>

                    {/* Add more FAQ items as needed */}

                </div>
            </Container>
        </div>
    );
};

export default FAQPage;
