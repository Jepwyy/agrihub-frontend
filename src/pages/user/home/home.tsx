import ContentWhatWeDo from "@components/user/landing/member/ContentWhatWeDo";
import Carousel from "@components/user/landing/member/carousel/Carousel";
import withAuthGuard from "@higher-order/account/withAuthGuard";
import React from "react";
import { Helmet } from "react-helmet-async";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <Helmet>
        <title>AgriHub | Welcome</title>
      </Helmet>
      <Carousel />
      <div className="bottom-8 sm:left-auto left-[46%] right-auto sm:right-8 fixed"></div>
      <ContentWhatWeDo />;
    </div>
  );
};

export default withAuthGuard(Home, [
  "guest",
  "member",
  "admin",
  "farm_head",
  "farmer",
  "asst_admin"
]);
