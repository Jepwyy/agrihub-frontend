import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthenticationSchema, authenticationSchema } from "./schema";
import { Button } from "@components/ui/button";
import SettingsField from "@components/user/settings/fields/SettingsField";
import withAuthGuard from "@higher-order/account/withAuthGuard";
import useForgotPasswordMutation from "@hooks/api/post/useForgotPasswordMutation";
import SettingsRequestResetPasswordDialog from "../../dialog/SettingsRequestResetPasswordDialog";
import useAuth from "@hooks/useAuth";
import { toast } from "sonner";
import useForgotPasswordByOTPMutation from "@hooks/api/post/useForgotPasswordByOTPMutation";

const UserSettingsAuthenticationForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const user = useAuth();

  const form = useForm<AuthenticationSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(authenticationSchema)
  });

  const {
    mutateAsync: sendEmail,
    isLoading: isSendEmailLoading,
    isSuccess: isSendEmailSuccess
  } = useForgotPasswordMutation();

  const {
    mutateAsync: sendOTP,
    isLoading: isSendOTPLoading,
    isSuccess: isSendOTPSuccess
  } = useForgotPasswordByOTPMutation();

  const handleSubmitForm = async (type: "email" | "phone") => {
    try {
      if (type === "email") await sendEmail(user?.data?.email);
      if (type === "phone") {
        const res = await sendOTP(String(user?.data?.contact_number));
      }
      toast.success("Password request sent to your email");
    } catch (err: any) {
      toast.error(err.body.message);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="py-10 space-y-10">
        <SettingsField
          hasForm={false}
          label="Change password"
          description="Request to change your current password"
          editable={false}
          buttonComponent={
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={e => {
                e.preventDefault();
                setIsDialogOpen(prev => !prev);
              }}
            >
              Change
            </Button>
          }
        />

        <SettingsRequestResetPasswordDialog
          isSendEmailLoading={isSendEmailLoading}
          isSendOTPLoading={isSendOTPLoading}
          disabled={isSendEmailSuccess || isSendOTPSuccess}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmitClick={(type: "email" | "phone") => {
            handleSubmitForm(type);
          }}
        />
      </form>
    </FormProvider>
  );
};

export default withAuthGuard(UserSettingsAuthenticationForm, [
  "member",
  "admin",
  "asst_admin",
  "farm_head",
  "farmer",
  "subfarm_head"
]);
