import jenkins.model.Jenkins
import org.jenkinsci.plugins.workflow.job.WorkflowJob
import org.jenkinsci.plugins.workflow.cps.CpsScmFlowDefinition
import hudson.plugins.git.GitSCM
import hudson.plugins.git.UserRemoteConfig
import hudson.plugins.git.BranchSpec

def instance = Jenkins.getInstance()
def jobName = "Lancelot-Pipeline"
def repoUrl = "https://github.com/YaHuy1525/Lancelot-Solana-Hackathon.git"
def scriptPath = "Jenkinsfile"

def existingJob = instance.getItem(jobName)
if (existingJob == null) {
    def job = instance.createProject(WorkflowJob.class, jobName)
    def scm = new GitSCM(repoUrl)
    scm.branches = [new BranchSpec("*/main"), new BranchSpec("*/master")]
    job.definition = new CpsScmFlowDefinition(scm, scriptPath)
    job.save()
    println "Successfully created automated Pipeline job: ${jobName}"
}
