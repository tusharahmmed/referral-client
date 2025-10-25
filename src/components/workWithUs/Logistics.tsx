import styles from "@/styles/work_with_us/logistics.module.scss";
import Image from "next/image";

import union from "@/assets/icons/union.svg";
import logistics1 from "@/assets/images/work/logistics1.png";
import logistics2 from "@/assets/images/work/logistics2.png";
import logistics3 from "@/assets/images/work/logistics3.png";

const Logistics = () => {
  return (
    <section className={`${styles.section} section_padding`}>
      <div className={styles.content}>
        <div>
          <h1>
            Work with <br />
            4U Logistics
          </h1>
          <p>
            At 4U Logistics, we are more than just a logistics company - we are
            your reliable partner in navigating the complexities of supply chain
            management. With a passion for excellence and a commitment to your
            success, we offer tailored logistics solutions designed to
            streamline your operations and propel your business forward.
          </p>
          <button>
            See more about us{" "}
            <Image
              src={union}
              height={12}
              width={16}
              // layout="responsive"
              alt="down-arrow"
            />
          </button>
        </div>
      </div>
      <div className={styles.imageWraper}>
        <div className={styles.wrap}>
          <Image
            layout="responsive"
            width={100}
            height={100}
            src={logistics1}
            alt="logistics-service"
          />
          <Image
            layout="responsive"
            width={100}
            height={100}
            src={logistics2}
            alt="logistics-service"
          />
        </div>
        <div className="col-span-3">
          <Image
            layout="responsive"
            width={629}
            height={423}
            src={logistics3}
            alt="logistics-service"
          />
        </div>
      </div>
    </section>
  );
};

export default Logistics;
