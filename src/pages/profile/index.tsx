import { getDomain } from "@/helpers/config/envConfig";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetCreditActivityQuery } from "@/rtk/features/api/creditActivityApi";
import {
  useGetProfileDetailsQuery,
  useGetProfileStatsQuery,
} from "@/rtk/features/api/userApi";
import { notification } from "antd";
import React from "react";

const Profile = () => {
  const { data: referralData } = useGetProfileStatsQuery(undefined);
  const { data: profileDetails } = useGetProfileDetailsQuery(undefined);

  const { data: creditActivities } = useGetCreditActivityQuery(undefined);

  // code
  const referralCode = profileDetails?.referral_code;

  const handleCopyReferralCode = () => {
    navigator.clipboard
      .writeText(`${getDomain()}/register?ref=${referralCode}`)
      .then(() => {
        notification.success({
          message: "Referral Code Copied!",
          description: `Code "${referralCode}" has been copied to clipboard.`,
          placement: "topRight",
          duration: 3,
        });
      })
      .catch(() => {
        const textArea = document.createElement("textarea");
        textArea.value = `${getDomain()}/register?ref=${referralCode}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        notification.success({
          message: "Referral Code Copied!",
          description: `Code "${referralCode}" has been copied to clipboard.`,
          placement: "topRight",
          duration: 3,
        });
      });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      {/* Referral Code Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Your Referral Code</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">
                Share this code with friends
              </div>
              <div className="text-2xl font-bold text-gray-800 font-mono">
                {referralCode}
              </div>
            </div>
            <button
              onClick={handleCopyReferralCode}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy Code
            </button>
          </div>
        </div>
      </div>

      {/* Referral Statistics Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Referral Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Total Referred</div>
            <div className="text-2xl font-bold text-blue-600">
              {referralData?.totalReferred}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              People you've referred
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Converted Users</div>
            <div className="text-2xl font-bold text-green-600">
              {referralData?.convertedUsers}
            </div>
            <div className="text-xs text-gray-400 mt-1">Successful signups</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Credits Earned</div>
            <div className="text-2xl font-bold text-purple-600">
              {referralData?.totalCreditsEarned}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Total credits from referrals
            </div>
          </div>
        </div>
      </div>

      {/* Credit Activity Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Credit Activity</h3>

        {creditActivities?.length > 0 ? (
          <div className="space-y-4">
            {creditActivities.map((activity: any) => (
              <div
                key={activity?._id}
                className="border border-gray-100 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">
                          +{activity?.credit}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Earned {activity?.credit} credit
                          {activity?.credit !== 1 ? "s" : ""}
                        </div>
                        <div className="text-sm text-gray-500">
                          From {activity?.reffer_to.name} (
                          {activity?.reffer_to.email})
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 ml-13">
                      <div className="font-medium">
                        {activity?.order_id?.course_id?.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Purchase: ${activity?.order_id?.price} •{" "}
                        {formatDate(activity?.order_id?.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {formatDate(activity?.createdAt)}
                    </div>
                    <div className="text-xs text-green-600 font-medium mt-1">
                      +{activity?.credit} credit
                      {activity?.credit !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg
              className="w-12 h-12 mx-auto text-gray-300 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>No credit activity yet</p>
            <p className="text-sm">Your referral credits will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
