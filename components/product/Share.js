import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import styles from "./styles.module.scss";

export default function Share() {
  return (
    <div className={styles.share}>
      <FacebookShareButton url={window?.location.href}>
        <FacebookIcon size={30} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={window?.location.href}>
        <FacebookMessengerIcon size={30} />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={window?.location.href}>
        <TwitterIcon size={30} />
      </TwitterShareButton>
      <LinkedinShareButton url={window?.location.href}>
        <LinkedinIcon size={30} />
      </LinkedinShareButton>
      <RedditShareButton url={window?.location.href}>
        <RedditIcon size={30} />
      </RedditShareButton>
      <TelegramShareButton url={window?.location.href}>
        <TelegramIcon size={30} />
      </TelegramShareButton>
      <WhatsappShareButton url={window?.location.href}>
        <WhatsappIcon size={30} />
      </WhatsappShareButton>
      <PinterestShareButton url={window?.location.href}>
        <PinterestIcon size={30} />
      </PinterestShareButton>
      <EmailShareButton url={window?.location.href}>
        <EmailIcon size={30} />
      </EmailShareButton>
    </div>
  );
}
