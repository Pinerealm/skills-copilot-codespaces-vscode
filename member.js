function skillsMember() {
    var member = function() {
        this.skills = [];
    };

    member.prototype.addSkill = function(skill) {
        this.skills.push(skill);
    };

    member.prototype.removeSkill = function(skill) {
        this.skills.splice(this.skills.indexOf(skill), 1);
    };

    member.prototype.getSkills = function() {
        return this.skills;
    };

    return member;
}