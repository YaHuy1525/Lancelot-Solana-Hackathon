// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobContract {
    struct Job {
        uint256 id;
        address payable employer;
        address payable contractor;
        string title;
        string description;
        uint256 price;
        bool completed;
        bool paid;
    }

    mapping(uint256 => Job) public jobs;
    uint256 public nextJobId;

    event JobCreated(
        uint256 id,
        address employer,
        string title,
        uint256 price
    );

    event JobCompleted(uint256 id);
    event JobPaid(uint256 id);

    function createJob(string memory _title, string memory _description, uint256 _price) public payable {
        require(msg.value == _price, "Payment must be equal to the price of the job");
        jobs[nextJobId] = Job(
            nextJobId,
            payable(msg.sender),
            payable(address(0)),
            _title,
            _description,
            _price,
            false,
            false
        );
        emit JobCreated(nextJobId, msg.sender, _title, _price);
        nextJobId++;
    }

    function completeJob(uint256 _jobId) public {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.employer, "Only the employer can complete the job");
        job.completed = true;
        emit JobCompleted(_jobId);
    }

    function payContractor(uint256 _jobId) public {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.employer, "Only the employer can pay the contractor");
        require(job.completed, "The job must be completed before payment");
        require(!job.paid, "The job has already been paid");
        job.paid = true;
        job.contractor.transfer(job.price);
        emit JobPaid(_jobId);
    }
}
