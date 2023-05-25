<template>
	<div>
		<h1>Assign a Project to {{ useUser().user.data.fullName }}</h1>
		<ProjectAutoComplete
			:items="useUser().allProjects"
			:selectItem="
				(i) => {
					useUser().assignProject(i)
				}
			" />
	</div>
</template>
