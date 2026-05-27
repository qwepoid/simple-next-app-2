import React from "react";
import Headers from "../src/components/Headers";

const WorkflowItem = ({
  title,
  description,
  buttonText,
  details,
  children,
}: {
  title: string;
  description: string;
  buttonText?: string;
  details?: { label: string; value: string }[];
  children?: React.ReactNode;
}) => (
  <div className="p-6 border rounded-xl shadow-md bg-white">
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    <p className="text-gray-600 mt-2">{description}</p>
    {details && (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
        {details.map((detail, index) => (
          <p key={index} className="font-mono">
            <span className="font-semibold">{detail.label}:</span>{" "}
            {detail.value}
          </p>
        ))}
      </div>
    )}
    {children}
    {buttonText && (
      <div className="mt-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          {buttonText}
        </button>
      </div>
    )}
  </div>
);

const JobCard = ({ jobId, assignedTo, status }) => (
  <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 w-full">
    <p className="font-mono">
      <span className="font-semibold">Job ID:</span> {jobId}
    </p>
    <p className="font-mono">
      <span className="font-semibold">Assigned to:</span> {assignedTo}
    </p>
    <p className="font-mono">
      <span className="font-semibold">Status:</span> {status}
    </p>
  </div>
);

const Workflow = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Headers />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Workflow Mockup
        </h1>
        <div className="flex items-center justify-center space-x-8">
          <WorkflowItem
            title="1. Customer Intake"
            description="Customer provides a sample and test requirements."
            buttonText="Create Service Request"
            details={[
              { label: "Sample Details", value: "{...}" },
              { label: "Test Requirements", value: "{...}" },
            ]}
          />

          <span className="text-3xl text-gray-400">→</span>

          <WorkflowItem
            title="2. Service Request"
            description="A service request is created to track the sample."
            buttonText="Break into Jobs"
            details={[{ label: "Service ID", value: "SR-001" }]}
          />

          <span className="text-3xl text-gray-400">→</span>

          <WorkflowItem
            title="3. Jobs"
            description="The service request is broken down into individual jobs."
          >
            <div className="flex flex-col space-y-4">
              <JobCard
                jobId="JOB-001-A"
                assignedTo="Analyst 1"
                status="In Progress"
              />
              <JobCard
                jobId="JOB-001-B"
                assignedTo="Analyst 2"
                status="Pending"
              />
              <JobCard
                jobId="JOB-001-C"
                assignedTo="Analyst 1"
                status="Completed"
              />
            </div>
          </WorkflowItem>

          <span className="text-3xl text-gray-400">→</span>

          <WorkflowItem
            title="4. Report"
            description="A report is generated when all jobs are complete."
            buttonText="Generate Report"
            details={[
              { label: "Report ID", value: "RPT-001" },
              { label: "Service ID", value: "SR-001" },
              { label: "Job IDs", value: "[JOB-001-A, ...]" },
            ]}
          />

          <span className="text-3xl text-gray-400">→</span>

          <WorkflowItem
            title="5. Invoice"
            description="An invoice is issued against the service request."
            buttonText="Issue Invoice"
            details={[
              { label: "Invoice ID", value: "INV-001" },
              { label: "Service ID", value: "SR-001" },
              { label: "Report ID", value: "RPT-001" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Workflow;
