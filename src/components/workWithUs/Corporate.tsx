import styles from "@/styles/work_with_us/corporate.module.scss";
import Image from "next/image";
import corporate1 from "@/assets/images/work/corporate1.png";
import corporate2 from "@/assets/images/work/corporate2.png";
import corporate3 from "@/assets/images/work/corporate3.png";
import corporate4 from "@/assets/images/work/corporate4.png";
import corporate5 from "@/assets/images/work/corporate5.png";
import corporate6 from "@/assets/images/work/corporate6.png";

const Corporate = () => {
  return (
    <section className={`${styles.section} section_padding`}>
      <h2>Our corporate values</h2>
      <div className={styles.itemWrpaer}>
        <div className={styles.item}>
          <div className={styles.thumbnail}>
            <Image
              src={corporate1}
              alt="corporate thumbnail"
              height={278}
              width={348}
              layout="responsive"
            />
          </div>
          <h3>Live cargo tracking:</h3>
          <p>
            We keep a close eye on your deliveries to ensure everything runs
            smoothly. Our team tracks the progress of your deliveries, providing
            you and our clients with real-time updates on shipment status.
          </p>
        </div>
        <div className={styles.item}>
          <div className={styles.thumbnail}>
            <Image
              src={corporate2}
              alt="corporate thumbnail"
              height={278}
              width={348}
              layout="responsive"
            />
          </div>
          <h3>Dedicated Customer Support: </h3>
          <p>
            We prioritize your satisfaction above all else. Our friendly and
            responsive customer support team is available 24/7 to address your
            inquiries and provide assistance whenever you need it.
          </p>
        </div>
        <div className={styles.item}>
          <div className={styles.thumbnail}>
            <Image
              src={corporate3}
              alt="corporate thumbnail"
              height={278}
              width={348}
              layout="responsive"
            />
          </div>
          <h3>Customized Solutions: </h3>
          <p>
            We understand that every business is unique, and your logistics
            needs should reflect that. Our team of experts takes the time to
            listen and analyze your requirements, delivering personalized
            solutions that optimize efficiency and reduce costs.
          </p>
        </div>
        <div className={styles.item}>
          <div className={styles.thumbnail}>
            <Image
              src={corporate4}
              alt="corporate thumbnail"
              height={278}
              width={348}
              layout="responsive"
            />
          </div>
          <h3>Seamless End-to-End Service: </h3>
          <p>
            From the moment your goods are in our care to their final
            destination, we handle every step of the logistics process. Enjoy a
            seamless experience with our comprehensive supply chain management,
            ensuring on-time deliveries and peace of mind.
          </p>
        </div>
        <div className={styles.item}>
          <div className={styles.thumbnail}>
            <Image
              src={corporate5}
              alt="corporate thumbnail"
              height={278}
              width={348}
              layout="responsive"
            />
          </div>
          <h3>Cost-Effective Solutions: </h3>
          <p>
            Your profitability is our concern. Our logistics experts work
            diligently to optimize routes, consolidate shipments, and negotiate
            favorable rates, saving you time and money without compromising on
            quality.
          </p>
        </div>
        <div className={styles.item}>
          <div className={styles.thumbnail}>
            <Image
              src={corporate6}
              alt="corporate thumbnail"
              height={278}
              width={348}
              layout="responsive"
            />
          </div>
          <h3>Transparency and Trust: </h3>
          <p>
            At 4U Logistics, we build lasting partnerships based on transparency
            and trust. With clear communication and reliable services, we earn
            your confidence as your dedicated logistics.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Corporate;
