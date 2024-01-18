/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FarmApplicationData = {
    /**
     * The ID of the farm application
     */
    id: string;
    /**
     * The name of the farm
     */
    farm_name: string;
    /**
     * The size of the farm
     */
    farm_size: string;
    /**
     * The district of the farm
     */
    district: string;
    /**
     * The proof image for the application
     */
    proof: string;
    /**
     * An array of actual farm image URLs
     */
    farm_actual_images: Array<string>;
    /**
     * The type of ID used for application
     */
    id_type: string;
    /**
     * The image of the valid ID
     */
    valid_id: string;
    /**
     * The selfie image of the applicant
     */
    selfie: string;
    /**
     * The ID of the applicant
     */
    applicant: string;
    /**
     * The status of the application
     */
    status: string;
};
