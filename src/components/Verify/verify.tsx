import React, { useEffect, useState, useRef } from "react";
import { Popup, Input } from "antd-mobile";
import {
  aliPayVerify,
  applyInstitutionVerify,
  checkInstitutionVerify,
} from "./api";

enum VerifyModeEnum {
  ALIPAY = "ALIPAY",
  UNION = "UNION",
}

enum CheckResultStatusEnum {
  F = "F", // 失败
  S = "S", // 成功
}

interface IApplyVerifyResult {
  mobilePhone: string;
  verifyId: string;
  expireTime: string;
  applyResult: string;
  failReason: string;
  codeType: string;
  codeNumber: string;
}

interface ICheckResult {
  cardAccountId: string;
  cardIndexNo: string;
  bankMark: string;
  bankName: string;
  checkResult: string;
  failReason: string;
  verifyId: string;
}

interface Props {
  verifyMode: VerifyModeEnum;
  callback: ([string]: string) => void;
  extendFields: {
    [key: string]: string;
  };
}
export const start = (props: Props) => {
  const { verifyMode, extendFields, callback } = props;

  const [uuid, setUuid] = useState("");
  const [verifyId, setVerifyId] = useState("");
  const [showInstitutionPopup, setShowInstitutionPopup] = useState(false);
  const [verificationText, setVerificationText] = useState("重发验证码");
  const [codeNumber, setCodeNumber] = useState("6"); // 验证码的位数

  const [bankPhone, setBankPhone] = useState("");
  const [bankPhoneDisabled, setBankPhoneDisabled] = useState(false);
  const [bankPhoneType, setBankPhoneType] = useState("text");
  const [bankCode, setBankCode] = useState("");

  useEffect(() => {
    const aliPayVerifyResult: any = aliPayVerifition();

    if (aliPayVerifyResult && verifyMode === VerifyModeEnum.UNION) {
      setShowInstitutionPopup(true);
      applyVerify();
    } else {
      callback && callback(aliPayVerifyResult?.verifyId);
    }
  }, []);

  const aliPayVerifition = async () => {
    const aliPayVerifyResult: any = await aliPayVerify(uuid);
    if (!aliPayVerifyResult) return;
    else return aliPayVerifyResult;
  };

  // 申请短信验证码
  const applyVerify = async () => {
    const { cardAccountId, productCode } = extendFields;
    const applyVerifyResult: IApplyVerifyResult = await applyInstitutionVerify(
      cardAccountId,
      productCode,
      "2123"
    );
    if (applyVerifyResult.applyResult === CheckResultStatusEnum.F) {
      Ali.showToast({
        content: applyVerifyResult.failReason,
        duration: 2000,
      });
    }
    if (applyVerifyResult.applyResult === CheckResultStatusEnum.S) {
      setCodeNumber(applyVerifyResult.codeNumber);
      setVerifyId(applyVerifyResult.verifyId);
      if (!applyVerifyResult.mobilePhone) {
      }
    }
  };

  // 输入验证码
  const handleChangeInstitutionCode = async (code: string) => {
    const { cardAccountId } = extendFields;
    if (code.length === +codeNumber) {
      const checkResult: ICheckResult = await checkInstitutionVerify(
        cardAccountId,
        code,
        verifyId
      );
      if (checkResult.checkResult === CheckResultStatusEnum.F) {
        Ali.showToast({
          content: checkResult.failReason,
          duration: 2000,
        });
      }
      if (checkResult.checkResult === CheckResultStatusEnum.S) {
        // 验证码校验成功后触发申请分期回调
        handleHidwddenInstitutionPopup();
      }
    }
  };

  const handleChangeInstitutionPhone = (val: string) => {
    setBankPhone(val);
  };

  const handleInstitutionEdit = () => {
    setBankPhoneDisabled(false);
    setBankPhoneType("number");
  };

  const handleHidwddenInstitutionPopup = () => {
    setShowInstitutionPopup(false);
  };

  const PopupStyle = {
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    minHeight: "40vh",
  };

  return (
    <Popup
      visible={showInstitutionPopup}
      showCloseButton
      onClose={handleHiddenInstitutionPopup}
      bodyStyle={PopupStyle}
    >
      <>
        <div className="institution-title">请输入验证码</div>
        <div className="institution-content">
          <div className="institution-phone">
            <div className="institution-phone-left">
              <span className="institution-label">手机号码</span>
              <Input
                className="institution-phone-input"
                placeholder="请输入银行预留的手机号"
                type={bankPhoneType}
                value={bankPhone}
                onChange={handleChangeInstitutionPhone}
                disabled={bankPhoneDisabled}
                clearable
              />
            </div>
            <span
              className="institution-phone-edit"
              onClick={handleInstitutionEdit}
            >
              编辑
            </span>
          </div>
          <div className="institution-code">
            <div className="institution-code-left">
              <span className="institution-label">验证码</span>
              <Input
                className="institution-code-input"
                placeholder="短信验证码"
                type="text"
                value={bankCode}
                onChange={(code) =>
                  handleChangeInstitutionCode(code, applyInstallment)
                }
                clearable
              />
            </div>
            <div className="institution-code-right">
              <span className="code-vertical-split" />
              <a
                className="code-countdown"
                style={{ color: verifyCountDown > 0 ? "#999999" : "#1677FF" }}
                onClick={handleSendVerification}
              >
                {verifyCountDown > 0
                  ? `${verifyCountDown}s后重发`
                  : verificationText}
              </a>
            </div>
          </div>
        </div>
      </>
    </Popup>
  );
};
