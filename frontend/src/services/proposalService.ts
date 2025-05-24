import api from './api'; // Assuming api.ts is your configured axios instance
import type { AxiosResponse } from 'axios';

// Interface for the data needed to create a proposal (sent to backend)
export interface ProposalFormData {
  jobId: string;          // The _id of the job being applied for
  freelancerId: string;   // The publicKey of the applicant
  proposalText: string;
  estimatedTime: string;
  availability: string;
}

// Interface for the proposal data received from the backend
export interface Proposal extends ProposalFormData {
  _id: string;
  clientId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  submittedAt: string; // Should be ISO date string
  updatedAt: string;   // Should be ISO date string
}

const proposalService = {
  // Create a new proposal
  createProposal: async (proposalData: ProposalFormData): Promise<Proposal> => {
    try {
      const response: AxiosResponse<{ success: boolean, message: string, data: Proposal }> =
        await api.post('/proposals', proposalData); // Endpoint is /api/proposals

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to create proposal');
      }
    } catch (error: any) {
      console.error('Error in proposalService.createProposal:', error);
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred while creating the proposal.';
      throw new Error(errorMessage);
    }
  },

  // TODO: Add other proposal service functions as needed
  // e.g., getProposalsForJob, getProposalsByFreelancer, updateProposalStatus
};

export default proposalService;
