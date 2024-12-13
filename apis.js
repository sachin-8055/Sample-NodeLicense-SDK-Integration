const router = require("express").Router();
const { License } = require("license-bb");

router.post("/license/initialize", async (req, res, next) => {
  try {
    const { email, phone, userName, orgId, orgName } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email can't be blank." });
    }
    if (!userName) {
      return res.status(400).json({ message: "User name (client name) can't be blank." });
    }
    if (!orgId) {
      return res.status(400).json({ message: "Org/Unique Id can't be blank." });
    }
    if (!orgName) {
      return res.status(400).json({ message: "Organization name can't be blank." });
    }
    const base_host_Url = "https://api.valydate4u.com";
    const default_license_Key = "9FAZ-98YF-7YN3-3Y24";
    const clientData = {
      email,
      phone,
      userName,
      orgId,
      orgName,
    };

    const lic_res = await License.init(base_host_Url, default_license_Key, clientData);

    res.status(200).json({ message: "Success.", result: lic_res });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error?.message || "Something went wrong." });
  }
});

router.post("/license/update", async (req, res, next) => {
  try {
    const { licenseKey, orgId } = req.body;

    if (!licenseKey) {
      return res.status(400).json({ message: "License key can't be blank." });
    }
    if (!orgId) {
      return res.status(400).json({ message: "Org/Unique Id can't be blank." });
    }

    const lic_res = await License.update(licenseKey, orgId);

    res.status(200).json({ message: "Success.", result: lic_res });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error?.message || "Something went wrong." });
  }
});

router.get("/license/:orgId/feature/:feature", async (req, res, next) => {
  try {
    const { orgId, feature } = req.params;

    if (!orgId) {
      return res.status(400).json({ message: "Org/Unique Id can't be blank." });
    }

    const _feature = feature && feature !== "" ? feature : "all";

    const lic_res = await License.getFeatures(orgId, _feature);

    res.status(200).json({ message: "Success.", result: lic_res });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error?.message || "Something went wrong." });
  }
});

router.get("/license/:orgId", async (req, res, next) => {
  try {
    const { orgId } = req.param;

    if (!orgId) {
      return res.status(400).json({ message: "Org/Unique Id can't be blank." });
    }

    const lic_res = await License.getLicenseDetails(orgId);

    res.status(200).json({ message: "Success.", result: lic_res });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error?.message || "Something went wrong." });
  }
});

module.exports = router;
