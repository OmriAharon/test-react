# Checklists Git workflows
This file describes the workflows **required** to be followed when developing in this repository.

## Setup
Before we start, make sure to update the following git configuration on your machine:
* Update you email and full name:
```
git config --global user.name “<my full name>”
git config --global user.email “<my email>”
```
* Update the ```push.default``` behavior on your machine:
```shell
git config --global push.default nothing
```
(What does this configuration do? Basically it forces you to specify on which branch you would like to push the code (```git push origin <developer's_name>/<branch_name>_BTLV-NUMBER```), so you won't accidentally push the code to master or any other branch. This settings is being done in order to avoid mistakes for those of us working with git from the command line. It will not effect SourceTree or alike tools.. For more info go [here](http://stackoverflow.com/questions/8170558/git-push-set-target-for-branch )).

## Working with branches
### master branch
No work should be done and pushed directly on the master branch.
The master branch should remain clean and only accept code the passes the a PR.

### release branch
The branch holds the code that is **going to be deployed on production**.
Why do we need it?
<br>
We want to have a clean branch to deploy from that is different fro the branch that keeps getting the developer's pushes. That way, we won't need to be extra careful before production releases.

Everyone will continue working, creating PRs and merging into the ```master``` branch without being afraid that the deployment would suffer from their merge.

Merging / Cherry picking to the release branch **must be done only manually!** That way if we need a specific fix before the production deployment we'll just cherry pick it to this branch.

The branch should be created in the following format:<br>
**release/DDMonthYYYY**

So for example: <br>
release/11feb2016

We should only keep the current release branch and the previous one. All the other release branches are no longer relevant and should be deleted.

### Developers branches
**Every work on the code** should be done on branches created **from** the ```master``` branch.<br>
All the work that is being done by the developers will be discussed in PRs (Pull requests.. We'll talk about it later).
After the PR will be approved it will then be **merged into the ```master``` branch.**

The format of creating your branches should be:
**developer's_name/branch_name_BTLV-NUMBER**

So for example:
kazaz/breadcrumbs_refactoring_BTLV-1237

That way all the branches of each developer will live in his folder and we'll have order with all the branches.<br>
The number of the BTLV-NUMBER should be the number of the JIRA ticket that branch is for, that way JIRA shows you information about the PR in the ticket itself.

#### If you already know why PRs are great, you can skip to the [expectations from a reviewer section](#expectations).

## Why PRs? (Pull Requests)
### General information
(Don't know what PRs are? Read [this](https://help.github.com/articles/using-pull-requests/) article)

The general ideas behind a PR are:
1. Discuss the work that was done by the developer.
* The PR **must be approved by someone else before it is being merged to the master branch**.

### Github's recommendation
First of all, don't believe us..?
Here is a [5 minutes read](https://guides.github.com/introduction/flow/) of what GitHub suggests to do (I'll give you a clue.. Use PRs..)

### What are we getting from it?
0. Less regressions - when other people are reviewing your code **before** it gets merged to master, there is less chance you'll create regression bugs.<br><br>
* Better quality of code - No one knows everything. You'll learn from other's experience and ideas and you'll end up with much better code.<br><br>
* Learn more pieces of the code - everyone could do anything!<br><br>
* So why not just code reviews..? In the GitHub platform for PRs you always sees what was before and the new code - so it actually forces you to see the git diff between your code and the previous code. <br>
This relates to the "Less regressions" point, but you'll catch much more bugs by always seeing what you did and changed. Especially in big tickets with a lot of changes where you get lost in your own code.<br><br>
* master is always clean - PRs supports the idea of that the master branch should be clean and with the best code we can make.

### I usually just grabs the person sitting next to me and shows him the code diff
First of all that is great! A lot of developers don't do that :-)

But, there is still something really great that we're getting from doing the PR offline compared to this method.<br>
When someone's review your code with you, you explain a lot to him (the workflows, important sections, decisions and so on..) - so your code is not being tested if it is understandable by its own.<br>
It doesn't test if another developer could understand it just by looking at it without you explaining it to him.

Taking the PR offline on your computer (of course you can ask question the developer that sits next to you.. Please see the [expectations from a reviewer section](#expectations)) will also give us that - if you can understand it on your own it is a well written code. Otherwise, some PR notes should be written about the clarity of the code.

### Why using PRs WON'T slow us down..?
The only thing that gets slower when using PRs is that a commit pushed by a developer takes longer to reach the master branch.

So how can I say that it won't slow us down?

1. In the long run having less regression bugs and a higher quality of code will resolve in time saving.
* We as a team **will be highly responsive to the review requests from our other team members**. So it won't take too much time to review a PR.
* While my PR is being reviewed it doesn't mean that I seat and wait, I'm just moving to the next ticket.

## Expectations when reviewing a PR <a name="expectations"></a>
In order to have everyone on the same page here are the expectations from a reviewer when asked to perform a PR review.

It is also important to remember that in the PR most of the notes will be on stuff we can **improve**, but it doesn't mean that you didn't do a great job developing this code :-)

1. See if you're the right person to review this code. If you have no idea about this code section, say who do you think will have.
* It is going to take you a long time to review due to other tasks? Say that and suggest someone else to review the code.
* Look for potential bugs.
* See that the main workflows in the PR are clear to you from the code.  If not, say how you think they could be improve.
* If you see that the PR is really big / you don't understand a lot of stuff, feel free to contact the developer on Slack and set up a quick meeting to go over some of the stuff. You can always type ```/appear``` in Slack and you both will get a quick online video conference with screen sharing without the need to install anything.
* Assume that all the code standards are correct since we're using a pre-commit hook.
* Mention if you see an unclear code section that you think a comment should be added to it.
* Mention if there is a missing [jsDoc](http://usejsdoc.org/) on functions.
* Mention stuff like: unclear variable names, missing code reuse and places where the code could be simplified.
* Mention if you think there is a potential regression bug that we need to also add some UT to prevent it.
* Also review the tests that were made as part of this PR.
* Mention the above remarks also on code that **wasn't** being done in this PR but is related to it.<br> Why? <br>We would like to improve all of our code base, so even old stuff could be improve. <br>Of course if it is too much of a change maybe a new Task ticket should be open for the refactoring, but if not - lets fix that old code :-)
* Mention GOOD JOB if you see something that was done nicely, a good feedback is also a needed feedback :-)

## Workflows
OK, enough with the background! Let's do this!

1. Move the JIRA ticket to the "In Progress" column.<br><br>
* Create a branch for your work on the ticket.
Remember, the format of the branch should be ```developer's_name/branch_name_BTLV-NUMBER```, so the branch will be created in the developer's folder along with all of his branches.<br><br>
* Work locally and perform commits. <br>
***How should a commit message look like?<br>***
All the commit messages *should have** the ```BTLV-<code>``` in them.
* Push to origin (you executed the command ```git config --global push.default nothing``` right..?)<br><br>
* Before creating a PR, make sure to rebase your branch from master (```git rebase master developer's_name/branch_name_BTLV-NUMBER```) + check that what you did still works and there are no conflicts. <br> (No conflicts doesn't mean that what you did still works! Someone could have break your logic during your work on your branch!)<br>
If you have conflicts that you are not sure on how to resolve them, contact the developer who wrote the lines of code that are in conflict to make sure you are not overriding any previous commits.<br><br>
* Create a PR **using Github interface**.<br><br>
* Mention a person to review your code in the PR comments.
<br>***Who should I mention?***<br>
Look at the files you've been working on, perform a git blame on them and mention the person that recently worked on these files.<br>
If it is something completely new, I'm sure you'll find someone to review your code.. <br>
The idea is that we'll also review code from **different geographic locations**.<br><br>
I'm a reviewer and I don't think I fit to review this piece of code, what do I do?<br>
Say it. Tell us who does fit, it is possible that you're the last person touched this file, but all you did was fixing some extra spaces there.. And hey, you're still CC to the PR so now you'll learn more pieces of the code :-)<br>
**All the people that you've PTAL must approve (LGTM) your PR before you'll merge it back to master!**
<br>***Mentions format***<br>
  * ```@kazazo PTAL``` (Please Take A Look)
  In this case, the reviewer should continue his work, and free some time to perform the review. Remember, you're also getting reviews and need it, so be kind to others :-)
  * What if I need it really really urgent? <br>
  Lets say we want to do a production deployment and we need a quick fix on something, then in your PR you mention like this: <br> ```@kazazo UR``` (Urgent Review) + **Slack / Mail the person / Grab him from his chair**.<br>
  In this case, the person that should review **should stop what he is doing and complete the review so we can continue**.<br>
  That way, PRs won't stuck us on really urgent stuff. Of course, don't misuse this tool and only UR when you truly need it (is should be very rare).<br><br>
* Move your ticket in JIRA to the column "In Review" and set there the reviewer<br><br>
* Discuss the code with each other.<br>
If for any reason the person is taking too much time to review your code, **PING him!** It is OK with everyone and that is the way we're working, so don't be afraid to "bug" someone, he deserves it for not doing your PR in time :-)
<br>***Remarks for the reviewer***<br>
  * When you're done with the PR and you **think it can go into the master branch** type in the PR comments: ```LGTM``` (Looks Good To Me).
  * Trust each other and save time - if you just have some small notes / stuff that doesn't need to discuss on, you can just comment them and at the end write ```P-LGTM``` (pending LGTM), **trust the other developer** that he'll do what you've said or he'll tell you why he thinks otherwise and then he won't merge.<br> That way we're saving the "ping pong" of the developer fixing the code, asking for another PTAL and you approving it.<br><br>
* Fix all the notes in the PR.
* (If the changes that your PR requires are really big and it will take some time to fix them, move your JIRA ticket back to "In Progress" and once you'll finish move it back to "In Review" / "Finished Dev").<br>You're doing that so the JIRA board will reflect your current work.<br><br>
* Merge the branch to master **using Github's PR merge button**. We're allowing ONLY squash commits.<br><br>
* Delete the branch **using Github's PR delete branch button**.<br><br>
(Relex, you can always recover the branch again exactly from where the delete button was.. But in general, the idea is that you'll never need to do so..). Don't forget to delete it, it also effects our Jenkins jobs, so the cleaner we'll be the better it is :-)<br><br>
* Move the JIRA ticket from "In Review" to "Finished Dev".<br><br>
* Move the ticket from "Finished Dev" to "Deployed" when it lands on the needed environment and ready for UX / QA tests.<br><br>
* Only QA / UX are allowed to close a ticket.<br><br>
* Go grab a cup of coffee :-)

## Vocabulary
| Phrase  | Meaning |
| ------------- | ------------- |
| PTAL  | Please Take A Look.<br>The person who creates the PR writes this along with the mentioning of the person he want to review his code.  |
| UR  | Urgent Review.<br>Which means to the reviewer: "Drop verything you're doing, and review this code".<br>This should **only be used when needed** - like an issue with the UT that breaks them and stop all the commits from moving on in the CI processes / important fix before a deployment or a hotfix that we would like to deploy.  |
| NIT  | Nitpicking.<br>Which means that the person commenting this NIT says something like: "Look, this is something small that I would change, and it is OK if we do not agree on it - there is no need to discuss it"  |
| LGTM  | Looks Good To Me.<br>The reviewer has approved the PR and the developer can merge it into master.  |
| P-LGTM  | Pending Looks Good To Me.<br>The reviewer posted some comments on the PR, which are pending to be addressed by the person who created the PR, but in general the reviewer approves the solution. The person who created the PR can merge the PR after all comments are addressed and agreed upon.  |

## 2 more cents
### Rebasing / Conflicts in the PR
During the review on your PR Github shows you if your branch can still be auto merge into master or not (because maybe some code has been pushed during the review the conflicts with yours). <br>
If auto merge cannot be performed, you **need to rebase the master on your branch**, fix the conflicts and push to your branch (by the way, the PR will be auto updated with your changes).

What if I can auto merge?
The recommendation is to **rebase anyway** before you merge. Why is that? <br>
Maybe you don't have any conflicts, but no one said that the logic still works, maybe someone broke it / added something new that logically conflicts with your changes.

So, rebase anyway after you got ```LGTM``` from your reviewer, and check that what you did still works.

### Tests
Are also part of the PR, the reviewer will see that as well.
<br>So do a good job :-)

### In general
The workflows aren't suppose to slow us down, they are meant to give us better results and a much better code to ship away to production.<br>
So enjoy it! Cause it feels good to work in an organized way :-)
