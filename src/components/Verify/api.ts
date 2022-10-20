import request from "@/common/util/request";
import { getVerifyIdentityResult } from "@/common/util/verifyIdentity";

// 支付宝核身
export const aliPayVerify = async (uuid: string) => {
  const verifyResult = await getVerifyIdentityResult({
    sceneId:
      "ccrprod_wallet_ccr_apply_instal_wallet_ccr_apply_instal_mobileClient",
    bizId: uuid,
    isNeedFP: "true",
    verifyType: "verify_init",
  });
  // 核身失败
  if (!verifyResult || verifyResult.code !== "1000" || !verifyResult.verifyId) {
    if (verifyResult.code === "1003") {
      throw new Error("用户主动取消核身");
    }
    throw new Error(JSON.stringify(verifyResult));
  }
  return await aliPayVerifyService(verifyResult.bizId, verifyResult.verifyId);
};

// 支付宝核身服务
export const aliPayVerifyService = async (bizId: string, verifyId: string) => {
  const params = {
    bizId,
    verifyId,
  };
  try {
    const result: any = await request(
      {
        url: "com.alipay.pcreditcardweb.creditCard.Installment.checkVerifyFlow",
        data: {
          ...params,
        },
      },
      {
        config: {
          errorHandler: {
            enable: false,
          },
        },
      }
    );
    if (!result || !result.success || result.verifyStatus.name !== "SUCCESS") {
      return false;
    }
    return result;
  } catch (error) {
    Ali.showToast({
      content: "系统繁忙，请重新尝试",
      duration: 2000,
    });
    return false;
  }
};

// 申请机构验证码
export const applyInstitutionVerify = async (
  cardAccountId: string,
  productCode: string,
  mobilePhone: string
) => {
  const params = {
    cardAccountId,
    productCode,
    mobilePhone,
  };
  try {
    const result: any = await request(
      {
        url: "com.alipay.pcreditcardweb.creditCard.Installment.applyVerification",
        data: {
          ...params,
        },
      },
      {
        config: {
          errorHandler: {
            enable: false,
          },
        },
      }
    );
    return result;
  } catch (error) {
    Ali.showToast({
      content: "系统繁忙，请重新尝试",
      duration: 2000,
    });
  }
};

// 验证机构验证码
export const checkInstitutionVerify = async (
  cardAccountId: string,
  verificationCode: string,
  verifyId: string
) => {
  const params = {
    cardAccountId,
    verificationCode,
    verifyId,
  };
  try {
    const result: any = await request(
      {
        url: "com.alipay.pcreditcardweb.creditCard.Installment.applyVerification",
        data: {
          ...params,
        },
      },
      {
        config: {
          errorHandler: {
            enable: false,
          },
        },
      }
    );
    return result;
  } catch (error) {
    Ali.showToast({
      content: "系统繁忙，请重新尝试",
      duration: 2000,
    });
  }
};
