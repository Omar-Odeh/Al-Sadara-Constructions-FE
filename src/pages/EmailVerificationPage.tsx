import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { confirm, resendCode } from "@/apis/auth";
import { useMainContext } from "@/contexts/MainContext";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";

function EmailVerificationPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, setUser } = useMainContext();
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    if (!user) return;

    const res = await confirm({
      params: {
        verificationCode: code,
        email: user.email,
      },
    });

    if (res.status === 200) {
      setUser(res.data);
      navigate("/products?page=1");
    }
  };

  const handleResend = async () => {
    if (!user) return;

    const res = await resendCode({
      params: {
        email: user.email,
      },
    });

    if (res.status === 200) {
      toast({
        title: t("emailVerification.resendSuccess"),
        description: t("emailVerification.checkYourEmail"),
      });
    }
  };

  return (
    <div
      className="self-start md:self-center w-[min(100%,_554px)] h-fit m-6 p-6 space-y-6 md:my-6 
                  text-center text-primary bg-neutral shadow-md shadow-primary/30 rounded-xl"
    >
      <img
        src="src/assets/email-verification.svg"
        alt="Email Verification"
        className="w-[min(100%,_150px)] md:w-[min(100%,_200px)] mx-auto"
      />
      <h2 className="text-2xl font-bold">{t("emailVerification.title")}</h2>
      <p>{t("emailVerification.instruction")}</p>
      <InputOTP
        containerClassName="mx-auto w-fit"
        className="translate-x-10"
        spellCheck={false}
        maxLength={6}
        value={code}
        onChange={(val) => setCode(val)}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      >
        <InputOTPGroup style={{ direction: "ltr" }}>
          {Array.from({ length: 6 }).map((val, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className="text-base uppercase ring-primary-50/60 bg-white 
                        border-y-primary first:border-l-primary last:border-r-primary 
                        first:rounded-l-lg last:rounded-r-lg"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <div className="flex items-center gap-6 flex-wrap-reverse w-full mx-auto">
        <button
          onClick={handleVerify}
          className="flex-1 min-w-40 px-4 py-2 whitespace-nowrap transition-colors bg-accent 
                  hover:bg-accent-600 text-white font-medium rounded-lg"
        >
          {t("emailVerification.verify")}
        </button>
        <button
          onClick={handleResend}
          className="flex-1 min-w-40 px-4 py-2 whitespace-nowrap transition-colors text-primary border 
                  border-primary hover:bg-primary-50/20 font-medium rounded-lg"
        >
          {t("emailVerification.resend")}
        </button>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
