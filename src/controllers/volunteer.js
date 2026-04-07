import { getProjectsByUserId } from '../models/users.js';

const showVolunteerPage = async (req, res) => {
    const user = req.session.user;
    const allProjects = await getProjectsByUserId(user.user_id);

    // Set isVolunteer per project
    if (req.session && user) {
        allProjects.forEach(project => {
            project.isVolunteer = project.volunteers && project.volunteers.includes(user.user_id.toString());
        });
    }

    //Filter projects to only include those that the user is volunteering for
    const projects = allProjects.filter(project => project.isVolunteer);            
    
    if (!user) {
        req.flash('error', 'You must be logged in to view the volunteering page.');
        return res.redirect('/login');
    }

    const title = 'Volunteering List';
    res.render('volunteering', { title, projects });
};

export { showVolunteerPage };