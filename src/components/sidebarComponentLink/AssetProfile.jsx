import React from "react";
import DisplayComponent from "./DisplayComponent";
import { MdOutlineWebAsset, MdAssignmentAdd } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { RiHammerFill } from "react-icons/ri";

export const assetData = {
  title: "Asset",
  src: "User",
  icon: <MdOutlineWebAsset fontSize={20} color={"grey"} />,
  path: "/app/asset",
  prePath: "asset",
  subMenus: [
    {
      title: "All Asset",
      icon: <MdAssignmentAdd fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/asset/all-AssetType",
    },
    {
      title: "Asset Assign",
      icon: <GrResources fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/asset/asset-assign",
    },
    {
      title: "All Equipments",
      icon: <RiHammerFill fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/asset/all-equipments",
    },
  ],
};
function AssetProfileSidenav() {
  return (
    <div>
      <DisplayComponent data={assetData} />
    </div>
  );
}

export default AssetProfileSidenav;
